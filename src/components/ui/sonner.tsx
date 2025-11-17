'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'
import { FaCircleInfo, FaCircleCheck, FaCircleExclamation, FaTriangleExclamation } from 'react-icons/fa6'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()
	const icons = {
		info: <FaCircleInfo className='text-blue-500' />,
		success: <FaCircleCheck className='text-green-500' />,
		error: <FaCircleExclamation className='text-red-500' />,
		warning: <FaTriangleExclamation className='text-yellow-500' />,
	}

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			icons={icons}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--normal-bg-hover': 'var(--popover-hover)',
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }