'use client'
import AppLayout from '@components/containers/layout/layout'
import RequestForm from './components/request-form'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const RequestPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: auth, status } = useSession()

	useEffect(() => {
		if (status === 'unauthenticated') {
			localStorage.setItem('redirectRequestUrl', window.location.href)
			window.location.href = '/auth/login'
		}
		else {
			localStorage.removeItem('redirectRequestUrl')
		}
	}, [status])

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center h-screen">
			</div>
		)
	}

	if (status === 'unauthenticated' && !auth) {
		return null
	}

	return (
		<AppLayout>
			<RequestForm />
		</AppLayout>
	)
}

export default RequestPage