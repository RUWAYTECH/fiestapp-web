'use client'

import { LuX } from 'react-icons/lu'
import { MouseEvent } from 'react'
import useCartStore from '@stores/cart'

interface CartModalProps {
	isOpen: boolean
	onClose: () => void
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
	const items = useCartStore((state) => state.items)
	const removeItem = useCartStore((state => state.removeItem))

	if (!isOpen) return null


	const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
			onClick={handleBackgroundClick}
		>
			<div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
				{/* Botón de cierre (X) */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
				>
					<LuX className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-bold mb-4">Tu Carrito</h2>

				{items.length === 0 ? (
					<p className="text-gray-500 text-sm">No hay servicios en tu carrito.</p>
				) : (
					<ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
						{items.map((item, index) => (
							<li
								key={index}
								className="border-b pb-2 flex justify-between items-center text-sm"
							>
								<span>{item.name}</span>
								<span className="text-gray-600">
									S/ {item.priceMin * item.quantity}
								</span>
								<button
									onClick={() => removeItem(item.id)}
									className="text-red-500 text-sm hover:underline"
								>
									Eliminar
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default CartModal