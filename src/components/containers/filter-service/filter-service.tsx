'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
	return (
		<>
			{open && (
				<div className='fixed inset-0 z-50 bg-black/80' onClick={onClose} />
			)}
			<div
				className={cn(
					'fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[90vh] w-full max-w-screen-sm sm:max-w-md flex-col rounded-t-[10px] border bg-background transition-transform overflow-hidden',
					open ? 'translate-y-0' : 'translate-y-full'
				)}
			>
				<div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
				{children}
			</div>
		</>
	)
}

interface DrawerTriggerProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
}

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ onClick, children }) => (
	<button onClick={onClick} className='btn btn-outline'>
		{children}
	</button>
)

interface DrawerCloseProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DrawerClose: React.FC<DrawerCloseProps> = ({ onClick }) => (
	<button
		onClick={onClick}
		className='absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md'
	>
		✕
	</button>
)

interface DrawerContentProps {
	className?: string;
	children?: React.ReactNode;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ className, children }) => (
	<div className={cn('p-4', className)}>
		{children}
	</div>
)

const DrawerHeader: React.FC<DrawerContentProps> = ({ className, children }) => (
	<div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}>
		{children}
	</div>
)

const DrawerFooter: React.FC<DrawerContentProps> = ({ className, children }) => (
	<div className={cn('mt-auto flex flex-col gap-2 p-4', className)}>
		{children}
	</div>
)

const DrawerTitle: React.FC<DrawerContentProps> = ({ className, children }) => (
	<h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
		{children}
	</h2>
)

const DrawerDescription: React.FC<DrawerContentProps> = ({ className, children }) => (
	<p className={cn('text-sm text-muted-foreground', className)}>
		{children}
	</p>
)

export {
	Drawer,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
}