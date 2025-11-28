'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../stores/cart';
import Link from 'next/link';
import CartItem from './cart-item';
import { useEffect, useState } from 'react';

export function CartDrawer() {
	const { items, isOpen, openCart, closeCart, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCart();

	const [mounted, setMounted] = useState(false);

	const totalItems = getTotalItems();
	const finalTotal = getTotalPrice();

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	return (
		<Sheet open={isOpen} onOpenChange={open => (open ? openCart() : closeCart())}>
			<SheetTrigger asChild>
				<button className="relative p-2 rounded-md hover:text-primary transition-colors" aria-label="Open cart">
					<ShoppingCart className="h-5 w-5" />
					{mounted && totalItems > 0 && (
						<Badge
							className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
							suppressHydrationWarning
						>
							{totalItems}
						</Badge>
					)}
				</button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-lg p-4" aria-describedby="cart-description">
				<SheetHeader className="p-0">
					<SheetTitle className="flex items-center gap-2">
						<ShoppingCart className="size-4" />
						Carrito de compras ({totalItems})
					</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col h-full">
					{items.length === 0 ? (
						<div className="flex-1 flex flex-col items-center justify-center text-center py-12">
							<ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
							<h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
							<p className="text-muted-foreground mb-6">Agrega productos a tu carrito para verlos aquí.</p>
							<Button onClick={closeCart} asChild>
								<Link href="/services">Explorar productos</Link>
							</Button>
						</div>
					) : (
						<>
							{/* Cart Items */}
							<div className="flex-1 overflow-y-auto">
								<div className="space-y-4">
									{items.map(item => (
										<CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
									))}
								</div>
							</div>

							{/* Cart Summary */}
							<div className="pt-6 space-y-4">
								<Separator />
								<div className="flex justify-between font-semibold">
									<span>Total</span>
									<span>S/{finalTotal.toFixed(2)}</span>
								</div>

								<div className="space-y-2">
									<Button className="w-full" onClick={closeCart} asChild>
										<Link href="/request">Proceder a pagar</Link>
									</Button>
									<SheetClose asChild>
										<Button variant="outline" className="w-full">
											Seguir comprando
										</Button>
									</SheetClose>
								</div>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
