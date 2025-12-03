'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import FormInputField from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '@/types/api-response.dto';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { validationMessages } from '@/core/constants/validation-messages';
import { dispatchToast } from '@/core/lib/toast';

export default function SignUpForm() {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const schema = z.object({
		email: z.email(validationMessages.email),
		name: z
			.string(validationMessages.string)
			.trim()
			.nonempty(validationMessages.required)
			.max(100, validationMessages.maxLength(100)),
		password: z
			.string(validationMessages.string)
			.trim()
			.nonempty(validationMessages.required)
			.min(8, validationMessages.minLength(8))
			.refine(
				value => {
					return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value);
				},
				{
					message: validationMessages.password
				}
			)
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			name: '',
			password: ''
		}
	});

	const submitHandler = async (data: z.infer<typeof schema>) => {
		try {
			setLoading(true);

			const res = await AuthService.register({
				email: data.email,
				name: data.name,
				password: data.password
			});

			dispatchToast.apiRes(res);

			router.push('/auth/login');
		} catch (err: unknown) {
			dispatchToast.apiRes(err as ApiResponse<null>);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
				<FormInputField control={form.control} name="email" label="Correo electrónico" type="email" />
				<FormInputField control={form.control} name="name" label="Nombre" type="text" />
				<FormInputField control={form.control} name="password" label="Contraseña" type="password" />
				<Button type="submit" className="w-full" disabled={loading}>
					{loading && <LoaderCircle className="animate-spin size-5" />}
					Registrarse
				</Button>
			</form>
		</Form>
	);
}
