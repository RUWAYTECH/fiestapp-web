'use client'

import { ApiResponseError } from '@/types'
import { Button } from '@components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '@stateManagement/apiSlices/authApi'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createLoginFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
	name: z.string().nonempty({ message: t('validation.required') }),
	email: z.string().nonempty({ message: t('validation.required') }).email({ message: t('validation.email') }),
	password: z.string().nonempty({ message: t('validation.required') }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: t('validation.password') }),
	password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
	message: t('validation.passwordMatch'),
	path: ['password_confirmation'],
})

const RegisterForm = () => {
	const router = useRouter()
	const formSchema = createLoginFormSchema(useTranslations())
	const [register, { isLoading }] = useRegisterMutation()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		register(values).unwrap().then((res) => {
			if (res.isValid) {
				toast.success('Registro exitoso')
				router.push('/auth/login')

				return
			}

			for(const error of res.messages) {
				toast.error(error.value)
			}
		}).catch((err: ApiResponseError) => {
			toast.error(err.data?.message || 'No se pudo registrar, intente de nuevo')
		})
	}

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex items-center justify-center mb-2">
					<div className="flex items-center justify-center size-[129px] rounded-full bg-white overflow-hidden">
						<Image src="/logo.png" alt="Logo" className='object-cover object-center' width={60} height={96.56} priority />
					</div>
				</div>
				<div className="space-y-1 text-center">
					<h1 className="text-3xl font-bold">Bienvenido</h1>
					<p className="text-muted-foreground">
						Regístrate para empezar a disfrutar de los beneficios de nuestra plataforma.
					</p>
				</div>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre completo</FormLabel>
							<FormControl>
								<Input placeholder="Nombre completo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo electrónico</FormLabel>
							<FormControl>
								<Input type='email' placeholder="ejemplo@gmail.com" autoComplete='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<Input type={'password'} placeholder="Contraseña" autoComplete='current-password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password_confirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmar contraseña</FormLabel>
							<FormControl>
								<Input type='password' placeholder="Confirmar contraseña" autoComplete='current-password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormItem>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Registrando...' : 'Registrarse'}
					</Button>
				</FormItem>
				<p className="text-center text-muted-foreground">
					¿Ya tienes una cuenta? <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Inicia sesión</Link>
				</p>
			</form>
		</Form>
	)
}

export default RegisterForm