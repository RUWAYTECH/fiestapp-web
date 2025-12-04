'use client';

import { Button } from '@/components/ui/button';
import { RequestWithItemsResDto } from '../dto/responses/request-res.dto';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RequestPaymentForm } from './request-payment-form';

interface RequestPaymentButtonProps {
	data: RequestWithItemsResDto;
}

export function RequestPaymentButton({ data }: RequestPaymentButtonProps) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Continuar con el pago</Button>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogContent
					onPointerDownOutside={e => e.preventDefault()}
					onInteractOutside={e => e.preventDefault()}
					onEscapeKeyDown={e => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle className="mb-4 text-center">Elija el método de pago</DialogTitle>
						<RequestPaymentForm onClose={() => setOpenModal(false)} requestId={data.id} />
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
