import { config } from '@config/config'
import { Button } from '@components/ui/button'
import Image from 'next/image'
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu'
import type { CartItem } from '@stores/cart'

interface CartItemProps {
	item: CartItem
	addItem: (item: CartItem) => void
	discountItem: (id: string) => void
	removeItem: (id: string) => void
}

const CartItem = ({ item, addItem, discountItem, removeItem }: CartItemProps) => {
	return (
		<li key={item.id} className="py-4 flex gap-4">
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
				<Image
					src={`${config.imagePublicApiUrl}${item.fileImage?.[0]?.url ?? ''}`}
					alt={item.name}
					width={96}
					height={96}
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<div className="flex justify-between text-base font-medium">
					<h3>{item.name}</h3>
					<p className="ml-4">S/ {(item.priceMin * item.quantity).toFixed(2)}</p>
				</div>
				<p className="mt-1 text-sm text-muted-foreground">S/ {item.priceMin.toFixed(2)}</p>
				<div className="flex items-center justify-between mt-2">
					<div className="flex items-center border rounded-md">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={() => discountItem(item.id)}
						>
							<LuMinus className="h-4 w-4" />
						</Button>
						<span className="w-8 text-center">{item.quantity}</span>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={() => addItem(item)}
						>
							<LuPlus className="h-4 w-4" />
						</Button>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => removeItem(item.id)}
						className="text-red-500 hover:text-red-700 hover:bg-red-50"
					>
						<LuTrash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</li>
	)
}

export default CartItem