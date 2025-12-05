import { Skeleton } from '@/components/ui/skeleton';

export function CategoryListSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg border">
					<Skeleton className="w-20 h-20 rounded-full" />
					<Skeleton className="h-4 w-20" />
				</div>
			))}
		</div>
	);
}
