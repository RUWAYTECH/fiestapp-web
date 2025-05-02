'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { useTranslations } from 'next-intl'
import { toastService } from '@/core/services/toast'
import { ApiResponseError } from '@/types'
import useCartStore from '@stores/cart'
import { Input } from '@components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreatePaymentServiceMutation } from '@stateManagement/apiSlices/paymentApi'
import { useUploadImageMutation } from '@stateManagement/apiSlices/imagesApi'

const createRequestFormSchema = (t: ReturnType<typeof useTranslations>) => z.object({
	transferNumber: z.string().nonempty({ message: t('validation.required') }).refine(
		(value) => {
			const num = Number.parseInt(value)
			return !isNaN(num) && Number.isInteger(num)
		}, { message: t('validation.integerPositive') }
	),
	image: z
		.any()
		.refine((file) => file instanceof File, { message: t('validation.required') })
		.refine((file) => file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
			message: t('validation.imageType'),
		})
})

interface AccordionPayProps {
	onClose?: () => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dataService?: any
}

export default function AccordionPay (props: AccordionPayProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { onClose, dataService } = props
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	const formSchema = createRequestFormSchema(useTranslations())

	const [uploadImage] = useUploadImageMutation()
	const [createPayment, { isLoading }] = useCreatePaymentServiceMutation()
	const clearCart = useCartStore((state) => state.clearCart)

	const renderForm = () => (
		<div className="p-6 bg-gray-50">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="transferNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Código de transacción*</FormLabel>
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
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imagen del Comprobante*</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										name={field.name}
										ref={field.ref}
										onBlur={field.onBlur}
										onChange={(e) => {
											const file = e.target.files?.[0]
											if (file) {
												handleImageChange(file)
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{previewImageUrl && (
						<div className="mt-2 flex justify-center">
							<img src={previewImageUrl} alt="Vista previa del comprobante" className="max-h-40 object-contain rounded-md" />
						</div>
					)}

					<Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white" disabled={isLoading}>
						Enviar Solicitud
					</Button>
				</form>
			</Form>
		</div>
	)

	const handleImageChange = (file: File) => {
		form.setValue('image', file)
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreviewImageUrl(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setPreviewImageUrl(null)
		}
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			transferNumber: '',
			image: undefined
		}
	})

	const { reset } = form
	useEffect(() => {
		reset({
			transferNumber: '',
			image: undefined,
		})
		setPreviewImageUrl(null)
	}, [activeIndex, reset])

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const dataUpload = {
			paymentImage: values.image,
		}
		uploadImage(dataUpload).then((item) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const uploadedImageIds = item.data.map((img: any) => img.id)
			const dataPayment = {
				transferNumber: values.transferNumber,
				paymentImage: uploadedImageIds || [],
			}
			createPayment(dataPayment).then(() => {
				clearCart()
				toastService.success('Pago realizado con éxito')
				onClose?.()
			}).catch((err: ApiResponseError) => {
				toastService.error(err?.data?.message || 'Error al enviar pago')
			})
		}).catch((err: ApiResponseError) => {
			toastService.error(err?.data?.message || 'Error al subir imagen')
		})
	}
	return (
		<div className="space-y-4">
			<div className="border rounded-lg shadow-md bg-emerald-500">
				<div
					className="p-4 flex justify-between items-center cursor-pointer"
					onClick={() => toggleAccordion(0)}
				>
					<h2 className="text-lg font-semibold text-gray-800">Yape o Plin</h2>
					<span className="text-gray-600">{activeIndex === 0 ? '-' : '+'}</span>
				</div>
				{activeIndex === 0 && (
					<div className="p-2 bg-gray-50 text-sm text-gray-700">
						Puedes pagar usando Yape o Plin al número <strong>999-999-999</strong>
					</div>
				)}
				{activeIndex === 0 && renderForm()}
			</div>

			<div className="border rounded-lg shadow-md bg-fuchsia-400">
				<div
					className="p-4 flex justify-between items-center cursor-pointer"
					onClick={() => toggleAccordion(2)}
				>
					<h2 className="text-lg font-semibold text-gray-800">Depósito Bancario</h2>
					<span className="text-gray-600">{activeIndex === 2 ? '-' : '+'}</span>
				</div>
				{activeIndex === 2 && (
					<>
						<div className="p-2 bg-gray-50 text-sm text-gray-700">
							Realiza el depósito a la cuenta BCP <strong>191-22222222-0-11</strong>
						</div>
						{renderForm()}
					</>
				)}
			</div>
		</div>
	)
}