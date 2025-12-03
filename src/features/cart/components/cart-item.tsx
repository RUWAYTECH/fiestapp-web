import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import type { CartItem } from '../stores/cart';

interface CartItemProps {
	item: CartItem;
	onUpdateQuantity: (id: string, quantity: number) => void;
	onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
	const handleUpdateQuantity = (newQuantity: number) => {
		onUpdateQuantity(item.id, newQuantity);
	};

	return (
		<div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
			<div className="w-12 h-12 bg-muted rounded-md overflow-hidden shrink-0">
				<img src={item.image || ''} alt={item.name} className="w-full h-full object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<h4 className="font-medium text-foreground text-sm leading-tight mb-1 line-clamp-1">{item.name}</h4>
				<p className="text-xs text-muted-foreground">{item.description}</p>

				<div className="flex items-center justify-between">
					<span className="font-semibold text-primary text-sm">
						S/{item.priceMin.toFixed(2)} - S/{item.priceMax.toFixed(2)}
					</span>

					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							onClick={() => handleUpdateQuantity(Math.max(0, item.quantity - 1))}
							className="h-6 w-6"
							disabled={item.quantity <= 1}
						>
							<Minus className="h-3 w-3" />
						</Button>
						<span className="font-medium text-foreground text-sm min-w-6 text-center">{item.quantity}</span>
						<Button
							variant="outline"
							size="icon"
							onClick={() => handleUpdateQuantity(item.quantity + 1)}
							className="h-6 w-6"
						>
							<Plus className="h-3 w-3" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => onRemoveItem(item.id)}
							className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
						>
							<Trash2 className="h-3 w-3" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
