'use client'
import store from '@stateManagement/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Provider } from 'react-redux'

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<Provider store={store}>
			<SessionProvider>
				{children}
			</SessionProvider>
		</Provider>
	)
}