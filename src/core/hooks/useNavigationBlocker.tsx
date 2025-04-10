// app/hooks/useNavigationBlocker.tsx
'use client'

import useCartStore from '@stores/cart'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function useNavigationBlocker(shouldBlock: boolean, specialRoute?: string) {
	const clearCart = useCartStore((state) => state.clearCart)

	const [nextUrl, setNextUrl] = useState<string | null>(null)
	const pathname = usePathname()
	const router = useRouter()
	const navigatingRef = useRef(false)

	const isSameRouteBase = (from: string, to: string, route: string) => {
		// Ejemplo: /service/123 -> /service/456 => true
		return from.startsWith(route) && to.startsWith(route)
	}

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!shouldBlock) return

			const link = (e.target as HTMLElement).closest('a[href]')
			if (link && !link.getAttribute('target')) {
				const href = link.getAttribute('href')

				if (href && href !== pathname) {
					if (specialRoute && isSameRouteBase(pathname, href, specialRoute)) {
						// Permitimos navegación entre /service/[id]
						return
					}
					e.preventDefault()
					setNextUrl(href)
				}
			}
		}

		document.addEventListener('click', handleClick, true)
		return () => document.removeEventListener('click', handleClick, true)
	}, [shouldBlock, pathname, specialRoute])

	const confirmNavigation = () => {
		if (nextUrl && !navigatingRef.current) {
			navigatingRef.current = true
			clearCart() // Limpiar el carrito antes de navegar
			router.push(nextUrl)
		}
	}

	const cancelNavigation = () => {
		setNextUrl(null)
		navigatingRef.current = false
	}

	return {
		shouldShowModal: !!nextUrl,
		confirmNavigation,
		cancelNavigation,
	}
}