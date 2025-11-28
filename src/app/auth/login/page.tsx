import SignInForm from '@/features/auth/components/signin-form';

export default function LoginPage() {
	return (
		<>
			<h1 className="text-2xl font-bold text-center">Inicia sesión en tu cuenta</h1>
			<p className="text-muted-foreground text-sm text-balance text-center mb-6">
				Introduce tu correo electrónico a continuación para iniciar sesión en tu cuenta
			</p>
			<SignInForm />
		</>
	);
}
