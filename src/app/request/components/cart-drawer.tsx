'use client'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from '@/components/ui/sheet'
import { LuShoppingCart } from 'react-icons/lu'
import useCartStore from '@stores/cart'
import { useRouter } from 'next/navigation'
import CartItem from './cart-item'

const CartDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
	const items = useCartStore((state) => state.items)
	const discountItem = useCartStore((state) => state.discountItem)
	const removeItem = useCartStore((state) => state.removeItem)
	const addItem = useCartStore((state) => state.addItem)
	const router = useRouter()

	const handleProceedToRequest = () => {
		if (items.length === 0) return
		router.push('/request')
		setIsOpen(false)
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
				<SheetHeader className="px-6">
					<SheetTitle className="flex items-center gap-2">
						<LuShoppingCart className="h-5 w-5" />
						Tu carrito ({items.length})
					</SheetTitle>
					<SheetDescription>
						{items.length === 0 ? 'No hay servicios en tu carrito.' : 'Revisa los servicios seleccionados antes de continuar.'}
					</SheetDescription>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto py-4">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12">
							<LuShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								No hay servicios en tu carrito.
							</p>
							<SheetClose asChild>
								<Button variant="outline" className="mt-4">
									Continuar comprando
								</Button>
							</SheetClose>
						</div>
					) : (
						<ul className="divide-y px-6">
							{items.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									addItem={addItem}
									discountItem={discountItem}
									removeItem={removeItem}
								/>
							))}
						</ul>
					)}
				</div>
				{items.length > 0 && (
					<SheetFooter className="border-t pt-4 px-6 flex flex-col gap-2">
						<div className="flex justify-between text-base font-medium mb-2">
							<p>Total aproximado</p>
							<p>S/ {items.reduce((total, item) => total + item.priceMin * item.quantity, 0).toFixed(2)}</p>
						</div>
						<Button className="w-full" onClick={handleProceedToRequest} disabled={items.length === 0}>
							Proceder a solicitar
						</Button>
						<SheetClose asChild>
							<Button variant="outline" className="w-full">
								Cancelar
							</Button>
						</SheetClose>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	)
}

export default CartDrawer