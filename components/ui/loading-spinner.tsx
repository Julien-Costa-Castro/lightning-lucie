import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30',
    secondary: 'border-t-secondary border-r-secondary/30 border-b-secondary/30 border-l-secondary/30',
    accent: 'border-t-accent border-r-accent/30 border-b-accent/30 border-l-accent/30',
    white: 'border-t-white border-r-white/30 border-b-white/30 border-l-white/30',
  };

  return (
    <div 
      className={cn(
        'inline-block animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
}
