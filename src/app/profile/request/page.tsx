'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Badge } from '@components/ui/badge'
import { Card } from '@components/ui/card'
import Skeleton from '@components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { useGetMyRequestServiceQuery } from '@stateManagement/apiSlices/requestSlice'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@components/ui/dialog'

import AccordionPay from './components/accordion-pay'

const MyRequestPage = () => {
	const { data, isFetching } = useGetMyRequestServiceQuery(undefined)
	const [openModal, setOpenModal] = useState(false)


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

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
	}


	return (
		<div>
			<Accordion type="single" collapsible className="w-full space-y-4">
				{isFetching && (
					[...Array(3)].map((_, index) => (
						<Skeleton key={index} className="h-16 w-full rounded-md" />
					))
				)}
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
							{item.entityStatus === 'Solicitado' ? (
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
							) : (
								<AccordionContent className="pb-4 px-4">
									<div className="flex flex-col md:flex-row gap-4 mt-2">
										<div className="flex-1 border rounded-md overflow-hidden">
											<div className="p-4 font-semibold text-lg border-b">Detalle de Servicios</div>
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

										<div className="flex-1 border rounded-md overflow-hidden">
											<div className="p-4 font-semibold text-lg border-b">Respuesta de proveedor</div>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>Servicio</TableHead>
														<TableHead className="text-right">Comentario</TableHead>
														<TableHead className="text-right">Cantidad</TableHead>
														<TableHead className="text-right">Precio final</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{item.requestServiceDetails.map((itm) => (
														<TableRow key={itm.id}>
															<TableCell>{itm.service.name}</TableCell>
															<TableCell className="text-right">{itm.comment}</TableCell>
															<TableCell className="text-right">{itm.quantity}</TableCell>
															<TableCell className="text-right font-medium">S/ {(itm.priceFinal).toFixed(2)}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</div>
									<div className="flex justify-end mt-4">
										<Button
											type="button"
											className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
											onClick={() => handleOpenModal()}
										>
											Aceptar
										</Button>
									</div>
								</AccordionContent>
							)}
						</Card>
					</AccordionItem>
				))}
			</Accordion>
			<Dialog open={openModal} onOpenChange={(open) => !open && handleCloseModal()}>
				<DialogContent size="md">
					<DialogHeader>
						<DialogTitle className='mb-4 text-center'>Elija el método de pago</DialogTitle>
						<AccordionPay onClose={handleCloseModal} dataService={data} />
					</DialogHeader>
					<DialogFooter className="flex justify-end gap-2">
						<Button variant="secondary" onClick={() => handleCloseModal()}>
							Cancelar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default MyRequestPage