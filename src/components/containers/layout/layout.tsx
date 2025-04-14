import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<main className="flex-grow">{children}</main>
				<Footer />
			</div>
		</>
	)
}

export default AppLayout