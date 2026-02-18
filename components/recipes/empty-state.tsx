'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, UtensilsCrossed } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export default function EmptyState({
  title,
  description,
  onRetry,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-lg bg-muted/20">
      <UtensilsCrossed className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {description}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
