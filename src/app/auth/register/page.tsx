import { Card, CardContent } from '@components/ui/card'
import RegisterForm from './registerForm'

const RegisterPage = () => {
	return (
		<Card className="mx-auto my-auto max-w-xl w-full">
			<CardContent>
				<RegisterForm />
			</CardContent>
		</Card>
	)
}

export default RegisterPage