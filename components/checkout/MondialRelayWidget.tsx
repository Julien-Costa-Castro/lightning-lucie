"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    $: any;
    jQuery: any;
    MR_ParcelShopPicker: any;
  }
}

interface RelayPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface MondialRelayWidgetProps {
  onSelect: (point: RelayPoint) => void;
  onReady?: () => void;
  onError?: (error: string) => void;
  defaultPostalCode?: string;
  isVisible: boolean;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 500; // ms

export function MondialRelayWidget({
  onSelect,
  onReady,
  onError,
  defaultPostalCode = '72000',
  isVisible,
}: MondialRelayWidgetProps) {
  const widgetInitialized = useRef(false);
  const widgetContainerId = useRef(`mondial-relay-widget-${Math.random().toString(36).substr(2, 9)}`);
  const targetInputId = useRef(`mondial-relay-target-${Math.random().toString(36).substr(2, 9)}`);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryCount = useRef(0);

  const loadScript = useCallback((src: string, isAsync = false): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = isAsync;
      script.onload = () => resolve(true);
      script.onerror = (err) => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }, []);

  const loadStylesheet = useCallback((href: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (existing) {
        resolve(true);
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve(true);
      link.onerror = (err) => reject(new Error(`Failed to load stylesheet: ${href}`));
      document.head.appendChild(link);
    });
  }, []);

  const initializeWidget = useCallback(async () => {
    if (!isVisible) return;
    
    try {
      const container = document.getElementById(widgetContainerId.current);
      if (!container) {
        throw new Error("Widget container not found");
      }

      // Ensure container is visible and has dimensions
      container.style.minHeight = '500px';
      container.style.visibility = 'visible';
      container.style.opacity = '1';

      if (!window.$) {
        throw new Error("jQuery not loaded");
      }

      const $container = window.$(container);
      if (!$container.length) {
        throw new Error("Failed to initialize jQuery on container");
      }

      // Initialize the widget
      $container.MR_ParcelShopPicker({
        Target: `#${targetInputId.current}`,
        Brand: "BDTEST  ",
        Country: "FR",
        PostCode: defaultPostalCode,
        Responsive: true,
        ShowResultsOnMap: true,
        AutoSelect: false,
        AutoClose: false,
        OnReady: function() {
          // Force la recherche avec le code postal 72000 après l'initialisation
          const input = document.querySelector('.MR-Search-Input');
          if (input) {
            (input as HTMLInputElement).value = '75001';
            const searchButton = document.querySelector('.MR-Search-Button');
            if (searchButton instanceof HTMLElement) {
              searchButton.click();
            }
          }
        },
        OnParcelShopSelected: function (data: any) {
          onSelect({
            id: data.ID,
            name: data.Nom || "Point relais",
            address: (data.Adresse1 || "") + (data.Adresse2 ? " " + data.Adresse2 : ""),
            city: data.Ville || "",
            zipCode: data.CP || "",
            country: data.Pays || "FR",
          });
        },
      });

      onReady?.();
      setIsLoading(false);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize widget";
      console.error("Widget initialization error:", errorMessage);
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
      throw error; // Re-throw for retry mechanism
    }
  }, [isVisible, defaultPostalCode, onSelect, onReady, onError]);

  const loadDependencies = useCallback(async () => {
    if (!isVisible) return;
    
    setIsLoading(true);
    setError(null);
    retryCount.current = 0;

    const tryInitialize = async () => {
      try {
        // Load jQuery if not already loaded
        if (!window.jQuery) {
          await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js");
          window.$ = window.jQuery = window.jQuery || window.$;
        }

        // Load Leaflet CSS and JS
        await Promise.all([
          loadStylesheet("https://unpkg.com/leaflet/dist/leaflet.css"),
          loadScript("https://unpkg.com/leaflet/dist/leaflet.js"),
        ]);

        // Load Mondial Relay Widget if not already loaded
        if (typeof window.MR_ParcelShopPicker === 'undefined') {
          await loadScript("https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js");
        }

        // Wait for DOM to be ready
        await new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', () => resolve());
          }
        });

        // Small delay to ensure container is rendered and visible
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Initialize the widget
        await initializeWidget();
        widgetInitialized.current = true;
        
      } catch (err) {
        if (retryCount.current < MAX_RETRIES) {
          retryCount.current++;
          console.warn(`Attempt ${retryCount.current} failed, retrying in ${RETRY_DELAY}ms...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return tryInitialize();
        }
        throw err;
      }
    };
    
    try {
      await tryInitialize();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error loading widget';
      console.error('Error loading widget:', errorMsg);
      setError(errorMsg);
      onError?.(errorMsg);
      setIsLoading(false);
    }
  }, [isVisible, loadScript, loadStylesheet, initializeWidget, onError]);

  // Load dependencies when component mounts or visibility changes
  useEffect(() => {
    if (isVisible && !widgetInitialized.current) {
      loadDependencies();
    }
  }, [isVisible, loadDependencies]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      widgetInitialized.current = false;
    };
  }, []);

  return (
    <div 
      id={widgetContainerId.current}
      className="w-full bg-white relative text-black"
      style={{
        minHeight: '600px',
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        display: isVisible ? 'block' : 'none',
        color: 'black' // Force text color
      }}
    >
      {/* Hidden input for widget to store selected point */}
      <div id={targetInputId.current} style={{ display: 'none' }} />
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">
            Chargement du sélecteur de point relais...
          </p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/80 z-10">
          <div className="text-center text-destructive">
            <p>Erreur lors du chargement du widget:</p>
            <p className="mt-2 font-medium">{error}</p>
            <button
              onClick={loadDependencies}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}
      
      {/* Widget container */}
      {!isLoading && !error && (
        <div className="w-full text-black" style={{ minHeight: '500px', color: 'black' }}>
          {/* This div will be replaced by the widget */}
        </div>
      )}
    </div>
  );
}
