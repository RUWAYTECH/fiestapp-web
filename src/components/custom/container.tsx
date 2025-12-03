import { cn } from '@/core/lib/utils';

interface ContainerProps {
	children?: React.ReactNode;
	className?: string;
	as?: React.ElementType;
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
	return <Component className={cn('w-full max-w-5xl mx-auto px-4', className)}>{children}</Component>;
}
