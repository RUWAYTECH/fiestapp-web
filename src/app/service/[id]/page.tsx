'use client'
import AppLayout from '@components/containers/layout/layout'
import ShowByServiceId from '../components/show-by-serviceid'
import { useParams } from 'next/navigation'
import { useGetServiceByIdQuery } from '@stateManagement/apiSlices/serviceApi'
import { useNavigationBlocker } from '../../../core/hooks/useNavigationBlocker'
import { Button } from '@components/ui/button'
import { DialogHeader, DialogFooter } from '@components/ui/dialog'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@components/ui/dialog'
import { useState } from 'react'

const RutaPage = () => {
	const { id } = useParams<{ id: string }>()

	const { data: servicesByIdData } = useGetServiceByIdQuery(id ?? '', {
		skip: !id,
	})

	const [hasChanges, setHasChanges] = useState(false)
	const {
		shouldShowModal,
		confirmNavigation,
		cancelNavigation,
	} = useNavigationBlocker(hasChanges, '/service/')

	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				{servicesByIdData &&
					<ShowByServiceId service={servicesByIdData.data} setHasChanges={setHasChanges} />}
			</div>
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
		</AppLayout>
	)
}
export default RutaPage