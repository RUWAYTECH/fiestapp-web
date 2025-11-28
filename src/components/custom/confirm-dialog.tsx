'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useConfirmStore } from '@/core/stores/confirm-store';

export function ConfirmDialog() {
	const { open, options, onConfirm, onCancel } = useConfirmStore();

	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{options?.title || 'Confirmar'}</DialogTitle>
					{options?.description && <DialogDescription>{options.description}</DialogDescription>}
				</DialogHeader>

				<DialogFooter className="flex justify-end gap-2">
					<Button variant="secondary" onClick={onCancel}>
						{options?.cancelText || 'Cancelar'}
					</Button>

					<Button variant="destructive" onClick={onConfirm}>
						{options?.confirmText || 'Aceptar'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
