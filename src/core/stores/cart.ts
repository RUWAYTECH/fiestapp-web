import { ServiceResponseDto } from '@stateManagement/models/service/create'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = ServiceResponseDto & { quantity: number }

interface CartState {
	items: CartItem[]
	addItem: (item: CartItem) => void
	discountItem: (id: string) => void
	removeItem: (id: string) => void
	clearCart: () => void
	getTotalPrice: () => number
}

const useCartStore = create<CartState>()(persist((set, get) => {
	return {
		items: [],
		addItem: (item) => {
			set((state) => {
				const existingItem = state.items.find((i) => i.id === item.id)

				const updatedItems = existingItem
					? state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
					: [...state.items, { ...item, quantity: 1 }]

				return { items: updatedItems }
			})
		},
		discountItem: (id) => {
			set((state) => {
				const existingItem = state.items.find((i) => i.id === id)

				if (existingItem && existingItem.quantity > 1) {
					const updatedItems = state.items.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
					return { items: updatedItems }
				}

				return { items: state.items }
			})
		},
		removeItem: (id) => {
			set((state) => {
				const updatedItems = state.items.filter((item) => item.id !== id)
				return { items: updatedItems }
			})
		},
		clearCart: () => {
			set(() => ({ items: [] }))
		},
		getTotalPrice: () => {
			return get().items.reduce((total, item) => total + item.priceMin * item.quantity, 0)
		}
	}
}, {
	name: 'cart',
	storage: createJSONStorage(() => localStorage)
}))

export default useCartStore