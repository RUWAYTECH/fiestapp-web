import SignUpForm from '@/features/auth/components/signup-form';

export default function RegisterPage() {
	return (
		<>
			<h1 className="text-2xl font-bold text-center">Crea una cuenta nueva</h1>
			<p className="text-muted-foreground text-sm text-balance text-center mb-6">
				Introduce tu correo electrónico a continuación para crear una cuenta nueva
			</p>
			<SignUpForm />
		</>
	);
}
