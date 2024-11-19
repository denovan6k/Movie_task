import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
     
      
      {/* Grid of movie card skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Movie poster skeleton */}
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            
            <div className="space-y-2">
              
              
              {/* Title skeleton */}
              <Skeleton className="h-6 w-3/4" />
              
              {/* Date and favorite skeleton */}
              <div className="flex justify-between gap-2 items-center">
                <Skeleton className="h-4 w-12" /> {/* Date */}
                <Skeleton className="h-6 w-6 rounded-full" /> {/* Favorite icon */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}