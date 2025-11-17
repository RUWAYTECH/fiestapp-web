import React from 'react'
import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			className={cn('animate-pulse bg-gray-200 rounded-md', className)}
			{...props}
		/>
	)
}

export default Skeleton