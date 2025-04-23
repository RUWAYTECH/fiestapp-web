'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Profile: React.FC = () => {
	const { data: auth,status  } = useSession()

	useEffect(() => {
		if (status === 'unauthenticated') {
			localStorage.setItem('redirectProfileUrl', window.location.href)
			window.location.href = '/auth/login'
		}
		else{
			localStorage.removeItem('redirectProfileUrl')
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
		<>
		</>
	)
}
export default Profile