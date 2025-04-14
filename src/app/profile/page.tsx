'use client'
import AppLayout from '@components/containers/layout/layout'
import { useSession } from 'next-auth/react'
import ProfilePage from './components/profile'
import { useEffect } from 'react'

const Profile: React.FC = () => {
	const { data: auth,status  } = useSession()

	useEffect(() => {
		if (status === 'unauthenticated') {
			localStorage.setItem('redirectProfileUrl', window.location.href)
			window.location.href = '/auth/login'
		}
	}, [status])

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center h-screen">
				{/* <p>Cargando...</p> */}
			</div>
		)
	}

	if (status === 'unauthenticated') {
		return null
	}

	return (
		<>
			<AppLayout>
				<ProfilePage />
			</AppLayout>
		</>
	)
}
export default Profile