'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useCartStore from '@stores/cart'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import CartItem from './cart-item'
import { useNavigationBlocker } from '@hooks/useNavigationBlocker'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useEffect, useState } from 'react'
import { useCreateRequestMutation } from '@stateManagement/apiSlices/requestSlice'
import { DatePickerField } from '@components/ui/datePickerField'
import { useRouter } from 'next/navigation'
import { toastService } from '@/core/services/toast'
import { ApiResponseError } from '@/types'

const now = new Date()
now.setHours(0, 0, 0, 0)

const createRequestFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
	date: z.date({ message: t('validation.string') }).refine(
		(value) => {
			const formattedNow = now.toISOString().split('T')[0]

			return value >= new Date(formattedNow)
		}, { message: t('validation.dateFuture') }
	),
	guests: z.string().nonempty({ message: t('validation.required') }).refine(
		(value) => {
			const num = Number.parseInt(value)
			return !isNaN(num) && Number.isInteger(num)
		}, { message: t('validation.integerPositive') }
	),
	budget: z.string({ message: t('validation.string') }).nonempty({ message: t('validation.required') }).refine(
		(value) => {
			const regex = /^\d+(\.\d{1,2})?$/
			return regex.test(value)
		}, { message: t('validation.decimal') }
	),
	details: z.string().max(250, { message: t('validation.maxLength', { maxLength: 250 }) }),
})

const RequestForm = () => {
	const items = useCartStore((state) => state.items)
	const removeItem = useCartStore((state) => state.removeItem)
	const addItem = useCartStore((state) => state.addItem)
	const discountItem = useCartStore((state) => state.discountItem)
	const clearCart = useCartStore((state) => state.clearCart)
	const router = useRouter()

	const formSchema = createRequestFormSchema(useTranslations())

	const [createRequest, { isLoading }] = useCreateRequestMutation()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: undefined,
			guests: '',
			budget: '',
			details: ''
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const data = {
			registerDate: values.date,
			numberInvite: Number(values.guests),
			approximateBudget: Number(values.budget),
			message: values.details,
			totalPrice: items.reduce((total, item) => total + item.priceMin * item.quantity, 0),
			entityStatus: 'Solicitado',
			provider: items?.[0]?.provider?.id ?? '',
			requestServiceDetail: items.map((item) => ({
				comment: '',
				quantity: item.quantity,
				priceFinal: item.priceMin,
				service: item.providerId
			}))
		}

		createRequest(data).then(() => {
			clearCart()
			toastService.success('Solicitud enviada con éxito')
			router.push('/profile/request')
		}).catch((err: ApiResponseError) => {
			toastService.error(err?.data?.message || 'Error al enviar la solicitud')
		})
	}

	const [hasChanges, setHasChanges] = useState(true)
	const {
		shouldShowModal,
		confirmNavigation,
		cancelNavigation,
	} = useNavigationBlocker(hasChanges, '/service/')

	useEffect(() => {
		setHasChanges(items.length > 0)
	}, [items, setHasChanges])

	return (
		<div className="container mx-auto py-6 px-4 md:px-6">
			<Card className="border rounded-xl shadow-sm">
				<CardContent className="p-6">
					{items.length > 0 ? (
						<>
							<div className="flex items-center mb-6">
								<h1 className="text-xl md:text-2xl font-semibold text-center flex-1 pr-6">Solicitar Cotización</h1>
							</div>

							<div className="text-sm text-muted-foreground mb-2">Para: {items?.[0]?.provider?.name}</div>
							<div className="grid lg:grid-cols-2 gap-8">
								<div className="space-y-6">
									<h2 className="font-medium text-lg">Items Seleccionados</h2>
									<div className="space-y-3">
										{items.map((item) => (
											<CartItem
												key={item.id}
												item={item}
												addItem={addItem}
												discountItem={discountItem}
												removeItem={removeItem}
											/>
										))}
									</div>
									<div className="flex justify-between font-medium text-lg pt-2">
										<span>Total Aproximado:</span>
										<span>S/ {items.reduce((total, item) => total + item.priceMin * item.quantity, 0).toFixed(2)}</span>
									</div>

									<div className="lg:hidden">
										<Separator className="my-6" />
									</div>
								</div>
								<div>
									<h2 className="font-medium text-lg mb-4">Información del Evento</h2>
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

											<FormField
												control={form.control}
												name="date"
												render={({ field }) => (
													<DatePickerField
														{...field}
														min={now}
														label="Fecha del Evento*"
													/>
												)}
											/>

											<FormField
												control={form.control}
												name="guests"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Número de Invitados*</FormLabel>
														<FormControl>
															<Input
																type='text'
																placeholder="Ej: 50"
																{...field}
																onChange={(e) => {
																	const value = e.target.value.replace(/[^0-9]/g, '')
																	field.onChange(value)
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="budget"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Presupuesto Aproximado*</FormLabel>
														<FormControl>
															<Input
																type='text'
																placeholder="Ej: 2000.00"
																{...field}
																onChange={(e) => {
																	const value = e.target.value.replace(/^(\d+)(\.\d{0,2})?.*$/, '$1$2')
																	field.onChange(value)
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="details"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Detalles Adicionales</FormLabel>
														<FormControl>
															<Textarea
																placeholder="Describa aquí cualquier detalle adicional que desee incluir en su solicitud."
																className="min-h-[100px] w-full"
																maxLength={250}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white" disabled={isLoading}>
												Enviar Solicitud
											</Button>
										</form>
									</Form>
								</div>
							</div>
						</>
					) : (
						<div className="flex flex-col items-center mb-6">
							<h1 className="text-xl md:text-2xl font-semibold text-center flex-1 pr-6">No hay servicios seleccionados</h1>
							<Button variant="destructive" className="mt-4">
								Continuar comprando
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
			<Dialog open={shouldShowModal} onOpenChange={(open) => !open && cancelNavigation()}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>¿Estás seguro que quieres salir?</DialogTitle>
						<DialogDescription>
							Si sales de la pantalla de servicios, se perderán los servicios que has añadido al carrito.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-end gap-2">
						<Button variant="secondary" onClick={cancelNavigation}>
							Cancelar
						</Button>
						<Button variant="destructive" onClick={confirmNavigation}>
							Vaciar y salir
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default RequestForm