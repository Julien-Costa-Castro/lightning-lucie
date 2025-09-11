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
  const [selectedPoint, setSelectedPoint] = useState<RelayPoint | null>(null);
  const retryCount = useRef(0);

  const loadScript = useCallback((src: string, isAsync = true): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = isAsync;
      script.onload = () => resolve();
      script.onerror = (err) => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }, []);

  const loadStylesheet = useCallback((href: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (existing) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = (err) => reject(new Error(`Failed to load stylesheet: ${href}`));
      document.head.appendChild(link);
    });
  }, []);

  const initializeWidget = useCallback(async (): Promise<() => void> => {
    if (!isVisible) return () => {};
    
    try {
      const container = document.getElementById(widgetContainerId.current);
      if (!container) {
        throw new Error("Widget container not found");
      }

      // Ensure container is visible and has dimensions
      container.style.minHeight = '500px';
      container.style.visibility = 'visible';

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
            if (searchButton) {
              (searchButton as HTMLButtonElement).click();
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

      // Add event listener for when a parcel shop is selected
      const handleParcelShopSelected = (event: any) => {
        const point = event.detail;
        if (point) {
          const relayPoint = {
            id: point.id,
            name: point.nom,
            address: point.adresse1,
            city: point.ville,
            zipCode: point.cp,
            country: point.pays
          };
          setSelectedPoint(relayPoint);
          // On ne déclenche pas encore onSelect, on attend la validation
        }
      };
      
      container.addEventListener('MR-ParcelShopSelected', handleParcelShopSelected);
      
      onReady?.();
      setIsLoading(false);
      
      // Nettoyage de l'event listener
      const cleanup = () => {
        container.removeEventListener('MR-ParcelShopSelected', handleParcelShopSelected);
      };
      
      return cleanup;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize widget";
      console.error("Widget initialization error:", errorMessage);
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
      throw error; // Re-throw for retry mechanism
    }
  }, [isVisible, defaultPostalCode, onSelect, onReady, onError]);

  const loadDependencies = useCallback(async (): Promise<void> => {
    if (!isVisible) return;
    
    setIsLoading(true);
    setError(null);
    retryCount.current = 0;

    const tryInitialize = async (): Promise<void> => {
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

        // Load Mondial Relay widget if not already loaded
        if (typeof window.MR_ParcelShopPicker === 'undefined') {
          await loadScript("https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js", false);
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
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isVisible, loadScript, loadStylesheet, initializeWidget, onError]);

  // Load dependencies when component mounts or visibility changes
  useEffect(() => {
    if (isVisible && !widgetInitialized.current) {
      loadDependencies();
    }
    
    // Fonction pour styliser le bandeau supérieur
    const styleHeader = () => {
      const header = document.querySelector('.MR-Header') as HTMLElement | null;
      if (header) {
        header.style.backgroundColor = '#000';
        header.style.color = '#fff';
      }
    };
    
    // Observer les changements dans le DOM pour appliquer le style au header
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          styleHeader();
        }
      });
    });
    
    // Démarrer l'observation
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Appliquer le style immédiatement si l'élément est déjà présent
    styleHeader();
    
    // Nettoyage
    return () => observer.disconnect();
  }, [isVisible, loadDependencies]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      widgetInitialized.current = false;
    };
  }, []);

  // Ajout d'un style global pour le bandeau supérieur
  useEffect(() => {
    // Style pour le bandeau supérieur
    const styleHeader = () => {
      // Créer un style global
      const styleId = 'mondial-relay-header-style';
      let style = document.getElementById(styleId) as HTMLStyleElement | null;
      
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          /* Cibler tous les en-têtes potentiels */
          .MR-Header, 
          [class*="header"], 
          [class*="Header"],
          .mr-widget-header,
          .mr-header,
          .mr-widget .header,
          .mr-widget > div:first-child {
            background-color: #000 !important;
            color: #fff !important;
            border-bottom: 1px solid #333 !important;
          }
          
          /* Cibler le texte dans l'en-tête */
          .MR-Header *,
          [class*="header"] *,
          [class*="Header"] *,
          .mr-widget-header *,
          .mr-header *,
          .mr-widget .header * {
            color: #fff !important;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Appliquer directement le style aux éléments existants
      const selectors = [
        '.MR-Header',
        '[class*="header"]',
        '[class*="Header"]',
        '.mr-widget-header',
        '.mr-header',
        '.mr-widget .header',
        '.mr-widget > div:first-child'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const el = element as HTMLElement;
          if (el.offsetParent !== null) { // Vérifier si l'élément est visible
            el.style.backgroundColor = '#000';
            el.style.color = '#fff';
            
            // Forcer la couleur du texte pour tous les enfants
            const allChildren = el.getElementsByTagName('*');
            for (let i = 0; i < allChildren.length; i++) {
              const child = allChildren[i] as HTMLElement;
              child.style.color = '#fff';
            }
          }
        });
      });
    };
    
    // Appeler styleHeader immédiatement
    styleHeader();
    
    // Et aussi après un délai pour s'assurer que le widget est chargé
    const timer = setInterval(styleHeader, 500);
    
    // Nettoyage
    return () => {
      clearInterval(timer);
      const style = document.getElementById('mondial-relay-header-style');
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  // Style pour cacher le message d'avertissement
  useEffect(() => {
    const hideWarning = () => {
      // Sélecteurs CSS valides
      const validSelectors = [
        '.MR-Warning',
        'div[style*="background-color: #FFF9C4"]',
        'div[style*="background-color:#FFF9C4"]',
        'div[style*="FFF9C4"]'
      ];

      // Appliquer le style à tous les éléments correspondants
      validSelectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.height = '0';
              el.style.padding = '0';
              el.style.margin = '0';
              el.style.overflow = 'hidden';
            }
          });
        } catch (e) {
          console.warn('Erreur avec le sélecteur:', selector, e);
        }
      });

      // Recherche par texte alternatif
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.nodeValue && node.nodeValue.includes('Demonstration Account')) {
          const parent = node.parentElement;
          if (parent) {
            parent.style.display = 'none';
            parent.style.visibility = 'hidden';
          }
        }
      }
    };

    // Exécuter immédiatement
    hideWarning();
    
    // Configurer un MutationObserver pour attraper les éléments ajoutés dynamiquement
    const observer = new MutationObserver(hideWarning);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
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
        <div className="w-full flex flex-col" style={{ minHeight: '500px' }}>
          <div className="w-full flex-grow">
            {/* Widget Mondial Relay */}
            <div className="w-full h-full" style={{ color: 'black' }}></div>
          </div>
          
          {/* Bouton de validation */}
          {selectedPoint && (
            <div className="bg-black p-4 flex justify-center">
              <button
                onClick={() => onSelect(selectedPoint)}
                className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Valider le point relais
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
