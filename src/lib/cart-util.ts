// Utility functions for managing the cart in localStorage

import { CartItemRequestDto, CartRequestDto } from "@stateManagement/models/cart/cart-request.dto"

const CART_KEY = 'cart.fiestapp'

// Get the cart from localStorage
export function getCart(): CartRequestDto[] {
	if (typeof window === 'undefined') return []
	const cart = localStorage.getItem(CART_KEY)
	return cart ? JSON.parse(cart) : []
}

// Save the cart to localStorage
export function saveCart(cart: CartRequestDto[]): void {
	localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// Add an item to the cart
export function addToCart(item: CartItemRequestDto): void {
	const cart = getCart()
	
	const existingItemIndex = cart.findIndex(
		(cartItem) => cartItem.id === item.id
	)

	if (existingItemIndex !== -1) {
		// If the item already exists, update the quantity
		cart[existingItemIndex].service.quantity += item.quantity
		cart[existingItemIndex].total_price = cart[existingItemIndex].service.priceMin * cart[existingItemIndex].service.quantity
	} else {
		// Otherwise, add the new item
		const cartRquestItem: CartRequestDto = {
			id: item.id,
			message: '',
			total_price: item.priceMin * item.quantity,
			service: item,
		}
		cart.push(cartRquestItem)
	}

	saveCart(cart)
}

// Update an item in the cart
export function updateCartItem(itemId: string, quantity: number): void {
	const cart = getCart()
	const itemIndex = cart.findIndex((cartItem) => cartItem.id === itemId)

	if (itemIndex !== -1) {
		if (quantity > 0) {
			// Update the quantity if it's greater than 0
			cart[itemIndex].service.quantity = quantity
		} else {
			// Remove the item if the quantity is 0 or less
			cart.splice(itemIndex, 1)
		}

		saveCart(cart)
	}
}

// Delete an item from the cart
export function deleteFromCart(itemId: string): void {
	const cart = getCart()
	const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId)

	saveCart(updatedCart)
	getCart()
}

// Clear all items from the cart
export function clearCart(): void {
	localStorage.removeItem(CART_KEY)
};
