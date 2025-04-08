'use client'
import AppLayout from '@components/containers/layout/layout'
import { useSession } from 'next-auth/react'
import ProfilePage from './components/profile'


const Profile: React.FC = () => {
    
	return (
		<AppLayout>
			<ProfilePage />
		</AppLayout>
	)
}
export default Profile