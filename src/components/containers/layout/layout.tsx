import React from 'react'
import Navbar from './navbar'
import { CartProvider } from '@app/request/context/cart-context'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
		 <CartProvider>
			<Navbar />
			{children}
		 </CartProvider>
			
		</>
	)
}

export default AppLayout