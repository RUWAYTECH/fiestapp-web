'use client'
import { Button } from '@components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import GoogleIcon from './googleIcon'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const createLoginFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
	email: z.string().nonempty({ message: t('validation.required') }),
	password: z.string().nonempty({ message: t('validation.required') }).min(3, { message: t('validation.minLength', { minLength: 6 }) }),
})

const LoginForm = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const formSchema = createLoginFormSchema(useTranslations())

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		signIn('credentials', { email: values.email, password: values.password, redirect: false }).then((res) => {
			if (res && res.ok) {
				router.push('/')
				return
			}

			toast.error('No se pudo iniciar sesión, intente de nuevo')
		}).catch(() => {
			toast.error('No se pudo iniciar sesión, intente de nuevo')
		})
	}

	useEffect(() => {
		if (searchParams.has('error')) {
			toast.error('No se pudo iniciar sesión')
		}
	}, [searchParams])

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Usuario</FormLabel>
							<FormControl>
								<Input placeholder="Usuario" autoComplete='email' {...field} />
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
								<Input type="password" placeholder="Contraseña" autoComplete='current-password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormItem>
					<Button type="submit">Iniciar sesión</Button>
				</FormItem>
				{/* --- o --- */}
				{/* iniciar sesion con google */}
				<FormItem>
					<Button type="button" variant='outline' onClick={() => signIn('google')}>
						<GoogleIcon className='w-6 h-6' />
						Iniciar sesión con Google
					</Button>
				</FormItem>
			</form>
		</Form>
	)
}

export default LoginForm