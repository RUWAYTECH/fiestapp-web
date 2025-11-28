'use client';

import FormInputField from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { configEnv } from '@/core/config';
import { validationMessages } from '@/core/constants/validation-messages';
import { dispatchToast } from '@/core/lib/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { RequestService } from '../services/request.service';
import { ApiResponse } from '@/types/api-response.dto';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RequestPaymentFormProps {
	onClose: () => void;
	requestId: string;
}

const schema = z.object({
	operationNumber: z.string(validationMessages.string).trim().nonempty(validationMessages.required),
	image: z.url(validationMessages.url),
	amount: z.coerce
		.string(validationMessages.string)
		.trim()
		.nonempty(validationMessages.required)
		.superRefine((val, ctx) => {
			const num = Number(val);
			if (isNaN(num) || num <= 0) {
				ctx.addIssue({
					code: 'custom',
					message: 'El monto debe ser un número válido mayor que cero.'
				});
			}
		})
});

export function RequestPaymentForm({ onClose, requestId }: RequestPaymentFormProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const session = useSession();
	const router = useRouter();

	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [method, setMethod] = useState('yape_plin');

	const form = useForm<z.infer<typeof schema>>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: zodResolver(schema as any),
		defaultValues: {
			operationNumber: '',
			image: '',
			amount: ''
		}
	});

	const image = form.watch('image');

	const submitHandler = async (data: z.infer<typeof schema>) => {
		const token = session.data?.accessToken || '';

		if (!token) {
			dispatchToast.error('No estás autenticado. Por favor, inicia sesión e inténtalo de nuevo.');
			return;
		}

		setLoading(true);

		try {
			const res = await RequestService.payCotization(
				requestId,
				{
					method: method == 'yape_plin' ? 'Yape/Plin' : 'Transferencia/Deposito',
					operationNumber: data.operationNumber,
					image: data.image,
					amount: Number(data.amount)
				},
				token
			);
			dispatchToast.apiRes(res);
			onClose();
			router.refresh();
		} catch (error) {
			dispatchToast.apiRes(error as unknown as ApiResponse<null>);
		} finally {
			setLoading(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];

		if (selectedFile) {
			const formData = new FormData();
			formData.append('file', selectedFile);
			formData.append('upload_preset', configEnv.cloudinary.prset);
			setUploading(true);
			axios({
				url: configEnv.cloudinary.url,
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: formData
			})
				.then(res => {
					setUploading(false);
					form.setValue('image', res.data.secure_url);
					if (inputRef.current) {
						inputRef.current.value = ''; // Reset file input
					}
					dispatchToast.success('Comprobante de pago cargada correctamente.');
				})
				.catch(err => {
					setUploading(false);
					dispatchToast.error(err.response?.data?.error?.message || err.message);
					if (inputRef.current) {
						inputRef.current.value = ''; // Reset file input
					}
				});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
				<Tabs defaultValue={method} onValueChange={setMethod}>
					<TabsList className="mb-4 w-full">
						<TabsTrigger value="yape_plin">Yape / Plin</TabsTrigger>
						<TabsTrigger value="card">Transferencia / Deposito</TabsTrigger>
					</TabsList>
					<TabsContent value="yape_plin">
						<div className="flex flex-col gap-4">
							<p className="text-sm">Realiza el pago a través de Yape o Plin utilizando el siguiente número:</p>
							<h3 className="text-lg font-semibold">+51 987 654 321</h3>
							<p className="text-sm">Luego, sube el comprobante de pago para completar la solicitud.</p>
						</div>
					</TabsContent>
					<TabsContent value="card">
						<div className="flex flex-col gap-4">
							<p className="text-sm">Realiza una transferencia o depósito a la siguiente cuenta bancaria:</p>
							<h3 className="text-lg font-semibold">Banco XYZ - Cuenta: 1234567890 - CCI: 00123456789012345678</h3>
							<p className="text-sm">Luego, sube el comprobante de pago para completar la solicitud.</p>
						</div>
					</TabsContent>
				</Tabs>
				<FormInputField
					type="text"
					control={form.control}
					name="operationNumber"
					label="Número de Operación"
					placeholder="Ingresa el número/código de la operación"
				/>
				<FormInputField
					label="Monto Pagado (S/)"
					placeholder="Ingresa el monto pagado"
					type="number"
					control={form.control}
					name="amount"
				/>
				<div>
					<Label className="mb-2 block text-sm">Comprobante de Pago</Label>
					<Button variant="outline" onClick={() => inputRef.current?.click()} className="w-full" disabled={uploading}>
						{uploading ? <Loader2 className="size-5 animate-spin" /> : <UploadCloud />}
						Subir Comprobante de Pago
					</Button>
				</div>
				<Input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />
				{image && (
					<div className="mb-4">
						<img src={image} alt="Comprobante de Pago" className="w-full h-auto max-h-40 rounded-md" />
					</div>
				)}
				<Separator />
				<div className="flex justify-end gap-4">
					<Button variant="secondary" onClick={onClose} className="ml-2" disabled={loading}>
						Cancelar
					</Button>
					<Button type="submit" disabled={loading}>
						{loading ? <Loader2 className="size-5 animate-spin" /> : ''}
						Confirmar Pago
					</Button>
				</div>
			</form>
		</Form>
	);
}
