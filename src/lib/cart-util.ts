// Utility functions for managing the cart in localStorage

const CART_KEY = 'cart.fiestapp'

// Get the cart from localStorage
export function getCart(): any[] {
	const cart = localStorage.getItem(CART_KEY)
	return cart ? JSON.parse(cart) : []
}

// Save the cart to localStorage
export function saveCart(cart: any[]): void {
	localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// Add an item to the cart
export function addToCart(item: any): void {
	const cart = getCart()
	const existingItemIndex = cart.findIndex(
		(cartItem) => cartItem.id === item.id
	)

	if (existingItemIndex !== -1) {
		// If the item already exists, update the quantity
		cart[existingItemIndex].quantity += item.quantity
	} else {
		// Otherwise, add the new item
		cart.push(item)
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
			cart[itemIndex].quantity = quantity
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
}

// Clear all items from the cart
export function clearCart(): void {
	localStorage.removeItem(CART_KEY)
};
