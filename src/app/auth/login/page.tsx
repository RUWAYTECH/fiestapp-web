import { Card, CardContent } from '@components/ui/card'
import { Suspense } from 'react'
import LoginForm from './loginForm'

const LoginPage = async () => {
	return (
		<Card className="mx-auto my-auto max-w-xl w-full">
			<CardContent>
				<Suspense fallback={<div className="flex items-center justify-center p-4">Loading...</div>}>
					<LoginForm />
				</Suspense>
			</CardContent>
		</Card>
	)
}

export default LoginPage