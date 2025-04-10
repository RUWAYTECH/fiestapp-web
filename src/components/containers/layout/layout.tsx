import React from 'react'
import Navbar from './navbar'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default AppLayout