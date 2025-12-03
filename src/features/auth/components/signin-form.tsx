'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import FormInputField from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { messages, validationMessages } from '@/core/constants/validation-messages';
import { dispatchToast } from '@/core/lib/toast';
import Link from 'next/link';

export default function SignInForm() {
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const schema = z.object({
		email: z.email(validationMessages.email),
		password: z.string(validationMessages.string).trim().nonempty(validationMessages.required)
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const submitHandler = async (data: z.infer<typeof schema>) => {
		setLoading(true);

		try {
			const res = await signIn('credentials', {
				email: data.email,
				password: data.password,
				callbackUrl: searchParams.get('callbackUrl') || '/',
				redirect: true
			});

			if (res && (res?.error || !res?.ok)) {
				dispatchToast.error(messages.invalidCredentials);
			}
		} catch {
			dispatchToast.error(messages.errorLogin);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
				<FormInputField control={form.control} name="email" label="Correo electrónico" type="email" />
				<FormInputField control={form.control} name="password" label="Contraseña" type="password" />
				<p className="text-sm text-muted-foreground">
					¿No tienes una cuenta?{' '}
					<Link href="/auth/register" className="text-primary hover:underline">
						Regístrate aquí
					</Link>
				</p>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading && <LoaderCircle className="animate-spin size-5" />}
					Iniciar sesión
				</Button>
			</form>
		</Form>
	);
}
