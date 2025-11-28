import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Container } from '@/components/custom/container';
import { Image } from '@/components/custom/image';
import { Card, CardContent } from '@/components/ui/card';
import { formatShowDate } from '@/core/lib/date';
import { RequestPaymentButton } from '@/features/request/components/request-payment-button';
import { RequestStatus, statusLabel } from '@/features/request/constants/request-status';
import { RequestService } from '@/features/request/services/request.service';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Calendar, CreditCard, MapPin } from 'lucide-react';
import { getServerSession } from 'next-auth';

interface RequestDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({ params }: RequestDetailPageProps) {
	const { id } = await params;
	const session = await getServerSession(authOptions);
	const res = await RequestService.getById(id, session?.accessToken || '');

	if (!res?.data) {
		return <div>La solicitud que estás buscando no existe.</div>;
	}

	const request = res.data;

	return (
		<Container>
			<Card className="p-4 mb-6 shadow-none flex flex-row flex-wrap items-start justify-between gap-4">
				<div className="flex-1">
					<p className="flex text-sm gap-4">
						<span className="text-green-600">{statusLabel[request.status]}</span>
						<span className="flex items-center gap-1 text-muted-foreground text-nowrap">
							<Calendar className="size-4 text-sky-600" />
							Solicitado el {formatShowDate(request.createdAt)}
						</span>
					</p>
					<p className="text-sm mt-4">{request.comment}</p>
				</div>
				{request.status === RequestStatus.IN_PROGRESS && <RequestPaymentButton data={request} />}
			</Card>
			<div className="flex relative flex-col md:grid md:grid-cols-[1fr_20rem] md:[grid-template-areas:'detail_shipping'] gap-4">
				<div className="md:[grid-area:detail]">
					<Card className="">
						<CardContent className="px-4">
							<h2 className="font-semibold text-lg">Servicios ({request.items.length})</h2>
							<Separator className="my-2" />
							<ul className="flex flex-col gap-4 divide-y">
								{request.items.map(item => (
									<li key={item.id} className="py-1.5">
										<div className="flex items-center justify-between gap-4">
											<div className="flex items-start gap-3">
												{item.service.images?.[0] && (
													<Image
														src={item.service.images[0].url}
														alt={item.service.name}
														className="w-12 h-12 object-contain object-center"
													/>
												)}
												<div>
													<p className="text-sm text-nowrap text-ellipsis overflow-hidden">{item.service.name}</p>
													<p className="text-sm font-light">{item.service.description}</p>
												</div>
											</div>
											<div className="text-end">
												<p className="text-sm">
													S/ {item.price} x {item.quantity}
												</p>
												<p className="text-sm font-semibold flex gap-2">
													{(item.price * item.quantity).toFixed(2) !== item.total.toFixed(2) && (
														<s className="text-muted-foreground mr-1">S/ {(item.price * item.quantity).toFixed(2)}</s>
													)}
													S/ {item.total.toFixed(2)}
												</p>
											</div>
										</div>
										{request.status !== RequestStatus.REQUESTED && (
											<p className="text-sm mt-2">
												<span className="font-semibold">Respuesta del proveedor:</span>
												{item.comment ? ` ${item.comment}` : ' -'}
											</p>
										)}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
				<div className="md:[grid-area:shipping] flex flex-col gap-4">
					<Card>
						<CardContent className="px-4 text-muted-foreground">
							<h2 className="font-semibold text-foreground mb-3">Datos del proveedor</h2>
							<p className="text-sm font-light text-foreground">{request.provider.name}</p>
							<p className="text-sm font-light text-foreground">{request.provider.email}</p>
							<p className="text-sm font-light text-foreground">{request.provider.phone}</p>
							<p className="text-sm font-light text-foreground flex items-center gap-2 mt-2">
								<MapPin className="size-3.5" />
								{request.provider.address}
							</p>
						</CardContent>
					</Card>
					{request.payment && (
						<Card>
							<CardContent className="px-4 text-muted-foreground">
								<h2 className="font-semibold flex items-center gap-2 text-foreground mb-3">
									<CreditCard className="size-4 text-blue-600" />
									{request.payment.method}
								</h2>
								<p className="text-sm font-light text-foreground">
									Nro operación terminado en **** {request.payment.transferNumber.slice(-4)}
								</p>
								<p className="text-sm font-light">Pagado el {formatShowDate(request.payment.paidAt ?? '')}</p>
							</CardContent>
						</Card>
					)}
					<Card>
						<CardContent className="px-4 text-muted-foreground">
							<h2 className="font-semibold text-foreground mb-3">Resumen de la cotización</h2>
							<div className="flex justify-between mb-1">
								<p className="text-sm font-light">Subtotal ({request.items.length} servicios)</p>
								<p className="text-sm font-light text-foreground">
									S/ {request.items.reduce((acc, item) => acc + item.total, 0)}
								</p>
							</div>
							<Separator className="my-2" />
							<div className="flex justify-between text-foreground font-semibold">
								<p>Total</p>
								<p>S/ {request.finalPrice}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Container>
	);
}
