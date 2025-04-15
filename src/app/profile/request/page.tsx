'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Badge } from '@components/ui/badge'
import { Card } from '@components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { useGetMyRequestServiceQuery } from '@stateManagement/apiSlices/requestSlice'

const MyRequestPage = () => {
	const { data } = useGetMyRequestServiceQuery(undefined)

	const getEstadoColor = (estado: string) => {
		switch (estado) {
			case 'Solicitado':
				return 'bg-yellow-500 text-white'
			case 'en proceso':
				return 'bg-blue-500 text-white'
			case 'completado':
				return 'bg-green-500 text-white'
			case 'cancelado':
				return 'bg-red-500 text-white'
			default:
				return ''
		}
	}

	return (
		<div>
			<Accordion type="single" collapsible className="w-full space-y-4">
				{data?.data?.map((item) => (
					<AccordionItem key={item.id} value={item.id.toString()} className="border rounded-lg overflow-hidden">
						<Card>
							<div className="p-4">
								<AccordionTrigger className="py-2 hover:no-underline">
									<div className="flex flex-col sm:flex-row sm:items-center w-full text-left gap-2 sm:gap-4">
										<div className="font-medium flex-1">{item.message}</div>
										<div className="flex items-center gap-4">
											<div className="font-semibold">S/ {item.totalPrice.toFixed(2)}</div>
											<Badge className={`${getEstadoColor(item.entityStatus)} capitalize`}>{item.entityStatus}</Badge>
										</div>
									</div>
								</AccordionTrigger>
							</div>

							<AccordionContent className="pb-4 px-4">
								<div className="border rounded-md overflow-hidden mt-2">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Servicio</TableHead>
												<TableHead className="text-right">Cantidad</TableHead>
												<TableHead className="text-right">Precio Unitario</TableHead>
												<TableHead className="text-right">Subtotal</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{item.requestServiceDetails.map((itm) => (
												<TableRow key={itm.id}>
													<TableCell>{itm.service.name}</TableCell>
													<TableCell className="text-right">{itm.quantity}</TableCell>
													<TableCell className="text-right">S/ {itm.service.priceMin.toFixed(2)}</TableCell>
													<TableCell className="text-right font-medium">
														S/ {(itm.quantity * itm.service.priceMin).toFixed(2)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</AccordionContent>
						</Card>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default MyRequestPage