'use client';

import { Container } from '@/components/custom/container';
import FormDateField from '@/components/form/form-date-field';
import FormInputField from '@/components/form/form-input-field';
import FormTextareaField from '@/components/form/form-textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { validationMessages } from '@/core/constants/validation-messages';
import { dispatchToast } from '@/core/lib/toast';
import CartItem from '@/features/cart/components/cart-item';
import { useCart } from '@/features/cart/stores/cart';
import { RequestService } from '@/features/request/services/request.service';
import { ApiResponse } from '@/types/api-response.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
	date: z.date(validationMessages.date).refine(date => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date >= today;
	}, validationMessages.dateLessThan(new Date().toLocaleDateString())),
	guestQuantity: z.coerce
		.string(validationMessages.string)
		.trim()
		.nonempty(validationMessages.required)
		.superRefine((val, ctx) => {
			const value = Number(val);
			if (isNaN(value) || !Number.isInteger(value) || !Number.isFinite(value)) {
				ctx.addIssue({
					code: 'custom',
					message: validationMessages.integer
				});
				return;
			}

			if (value < 1) {
				ctx.addIssue({
					code: 'custom',
					message: validationMessages.minValue(1)
				});
			}
		}),
	budget: z.coerce
		.string(validationMessages.string)
		.trim()
		.nonempty(validationMessages.required)
		.superRefine((val, ctx) => {
			const value = Number(val);
			if (isNaN(value) || !Number.isFinite(value)) {
				ctx.addIssue({
					code: 'custom',
					message: validationMessages.integer
				});
				return;
			}

			if (value < 0) {
				ctx.addIssue({
					code: 'custom',
					message: validationMessages.minValue(0)
				});
			}
		}),
	comments: z
		.string(validationMessages.string)
		.trim()
		.nonempty(validationMessages.required)
		.max(500, validationMessages.maxLength(500))
});

export default function RequestPage() {
	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
	const finalTotal = getTotalPrice();
	const { data: auth } = useSession({ required: true });
	const router = useRouter();

	const form = useForm<z.infer<typeof schema>>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: zodResolver(schema as any),
		defaultValues: {
			date: new Date(),
			guestQuantity: '',
			budget: '',
			comments: ''
		}
	});

	const onSubmit = async (data: z.infer<typeof schema>) => {
		const token = auth?.accessToken || '';

		if (!token) {
			dispatchToast.error('Debes iniciar sesión para solicitar una cotización.');
			return;
		}

		if (items.length === 0) {
			dispatchToast.error('Debes agregar al menos un servicio a tu solicitud.');
			return;
		}

		setLoading(true);

		try {
			const res = await RequestService.cotization(
				{
					guestQty: Number(data.guestQuantity),
					budgetAmount: Number(data.budget),
					eventDate: data.date,
					comment: data.comments,
					items: items.map(item => ({
						id: item.id,
						quantity: item.quantity
					}))
				},
				token
			);

			dispatchToast.apiRes(res);
			clearCart();

			form.reset();
			router.push('/requests');
		} catch (error) {
			dispatchToast.apiRes(error as unknown as ApiResponse<null>);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (items.length === 0) {
		return (
			<Container className="flex flex-col items-center justify-center text-center py-20">
				<ShoppingCart size={40} />
				<h1 className="text-xl md:text-2xl font-semibold text-center flex-1 pr-6 mb-4 mt-10">
					Aún no has agregado servicios a tu solicitud
				</h1>
				<Button className="mt-6" asChild>
					<Link href="/services">Explorar servicios</Link>
				</Button>
			</Container>
		);
	}

	return (
		<Container className="grid grid-cols-2 gap-6">
			<div className="flex flex-col h-full">
				<div className="space-y-4">
					{items.map(item => (
						<CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
					))}
				</div>
				<div className="pt-6 space-y-4">
					<Separator />
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>S/{finalTotal.toFixed(2)}</span>
					</div>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<h1 className="text-xl md:text-2xl font-semibold text-center flex-1 pr-6">Solicitar Cotización</h1>
					<FormDateField control={form.control} name="date" label="Fecha del evento" />
					<FormInputField control={form.control} name="guestQuantity" label="Cantidad de invitados" type="number" />
					<FormInputField control={form.control} name="budget" label="Presupuesto estimado (S/)" type="number" />
					<FormTextareaField control={form.control} name="comments" label="Comentarios" />
					<Button type="submit" className="mt-4" disabled={loading}>
						{loading && <Loader2 className="animate-spin size-5" />}
						Solicitar Cotización
					</Button>
				</form>
			</Form>
		</Container>
	);
}
