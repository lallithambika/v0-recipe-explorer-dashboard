'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="flex gap-4 p-4 border border-border rounded-lg">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2 w-24">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
