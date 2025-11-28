import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
	id: string;
	name: string;
	description?: string;
	priceMin: number;
	priceMax: number;
	image: string;
	category: string;
	providerId: string;
	quantity: number;
}

interface CartStore {
	items: CartItem[];
	isOpen: boolean;
	addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	getItem: (id: string) => CartItem | undefined;
	clearCart: () => void;
	deleteWithDifferentProvider: (providerId: string) => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
	openCart: () => void;
	closeCart: () => void;
}

export const useCart = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,
			addItem: (item, quantity) => {
				const items = get().items;
				const existingItem = items.find(i => i.id === item.id);

				if (existingItem) {
					set({
						items: items.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + (quantity || 1) } : i))
					});
				} else {
					set({ items: [...items, { ...item, quantity: quantity || 1 }] });
				}
			},
			removeItem: id => {
				const items = get().items;
				const removeIndex = items.findIndex(i => i.id === id);

				if (removeIndex !== -1) {
					items.splice(removeIndex, 1);
					set({ items: [...items] });
				}
			},
			updateQuantity: (id, quantity) => {
				if (quantity <= 0) {
					get().removeItem(id);
					return;
				}

				set({
					items: get().items.map(item => (item.id === id ? { ...item, quantity } : item))
				});
			},
			getItem: id => {
				return get().items.find(item => item.id === id);
			},
			clearCart: () => set({ items: [] }),
			deleteWithDifferentProvider: (providerId: string) => {
				set({
					items: get().items.filter(item => item.providerId === providerId)
				});
			},
			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},
			getTotalPrice: () => {
				return get().items.reduce((total, item) => total + item.priceMin * item.quantity, 0);
			},
			openCart: () => set({ isOpen: true }),
			closeCart: () => set({ isOpen: false })
		}),
		{
			name: 'fiestapp-cart-storage'
		}
	)
);
