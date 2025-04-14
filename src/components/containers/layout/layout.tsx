import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}

export default AppLayout