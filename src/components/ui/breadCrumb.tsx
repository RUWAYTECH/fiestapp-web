import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav className={cn('flex items-center space-x-2', className)} {...props} />
	)
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
	return (
		<ol className={cn('flex items-center', className)} {...props} />
	)
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li className={cn('flex items-center', className)} {...props} />
	)
}

function BreadcrumbLink({ href, className, ...props }: React.ComponentProps<typeof Link>) {
	return (
		<Link href={href} className={cn('text-sm font-medium text-muted-foreground hover:text-primary', className)} {...props} />
	)
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span className={cn('text-sm font-medium text-foreground', className)} {...props} />
	)
}

function BreadcrumbSeparator({ className, icon = <ChevronRight className="w-4 h-4 text-blue-500 mt-1"/>, ...props }: React.ComponentProps<'span'> & { icon?: React.ReactNode }) {
	return (
		<span className={cn('mx-1 text-muted-foreground', className)} {...props}>
			{icon}
		</span>
	)
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
}