import { Badge } from '@/components/ui/badge';
import { statusColor } from '../constants/request-status';
import { RequestResDto } from '../dto/responses/request-res.dto';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatShowDate } from '@/core/lib/date';

export function RequestCard({ request }: { request: RequestResDto }) {
	return (
		<li className="p-4 bg-card rounded shadow flex flex-wrap gap-2 items-start justify-between">
			<div className="">
				<p className="font-medium mb-2">{request.comment}</p>
				<h3 className="font-semibold flex items-center gap-3 mb-2">
					{/* <span>#{request.orderNumber}</span> */}
					<Badge className={statusColor[request.status] || 'bg-gray-600 text-white'}>{request.status}</Badge>
				</h3>
				<p className="text-sm text-muted-foreground">Solicitado el {formatShowDate(request.createdAt)}</p>
				<p className="text-sm font-semibold">Total: S/ {request.priceFinal}</p>
			</div>
			<div className="">
				<Button variant="default" size="sm">
					<Link href={`/requests/${request.id}`}>Ver Detalles</Link>
				</Button>
			</div>
		</li>
	);
}
