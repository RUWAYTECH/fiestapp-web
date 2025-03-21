import { Card, CardContent } from '@components/ui/card'
import LoginForm from './loginForm'

const LoginPage = async () => {
	return (
		<Card className="mx-auto my-auto max-w-2xl w-full">
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	)
}

export default LoginPage