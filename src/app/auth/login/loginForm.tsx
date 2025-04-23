'use client'

import { toastService } from '@/core/services/toast'
import { Button } from '@components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { z } from 'zod'
import GoogleIcon from './googleIcon'

const createLoginFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
	email: z.string().nonempty({ message: t('validation.required') }).email({ message: t('validation.email') }),
	password: z.string().nonempty({ message: t('validation.required') }).min(6, { message: t('validation.minLength', { minLength: 6 }) }),
})

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
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
				router.push(localStorage.getItem('redirectServiceUrl') || localStorage.getItem('redirectProfileUrl') || localStorage.getItem('redirectRequestUrl') || '/')
				return
			}

			toastService.error('No se pudo iniciar sesión, intente de nuevo')
		}).catch(() => {
			toastService.error('No se pudo iniciar sesión, intente de nuevo')
		})
	}

	useEffect(() => {
		if (searchParams.has('error')) {
			toastService.error('No se pudo iniciar sesión')
		}
	}, [searchParams])

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: localStorage.getItem('redirectServiceUrl') || localStorage.getItem('redirectProfileUrl') || localStorage.getItem('redirectRequestUrl') || '/',
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
						Inicia sesión para continuar
					</p>
				</div>
				<FormItem>
					<Button type="button" variant='outline' onClick={handleGoogleLogin}>
						<GoogleIcon className='w-6 h-6' />
						Continuar con Google
					</Button>
				</FormItem>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							O continúa con
						</span>
					</div>
				</div>
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
							<div className="relative">
								<FormControl>
									<Input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" autoComplete='current-password' className='pr-8' {...field} />
								</FormControl>
								<button type="button" className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormItem>
					<Button type="submit">Iniciar sesión</Button>
				</FormItem>
				<p className="text-center text-muted-foreground">
					¿No tienes cuenta? <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Regístrate</Link>
				</p>
			</form>
		</Form>
	)
}

export default LoginForm