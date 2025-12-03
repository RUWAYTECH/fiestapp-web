import { ServiceCard } from '@/features/service/components/service-card';
import { ServiceService } from '@/features/service/services/service.service';
import Link from 'next/link';

export async function ServiceList() {
	const res = await ServiceService.getAll({
		page: 1,
		pageSize: 6
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
			{res?.data.map(item => (
				<Link key={item.id} href={`/services/${item.id}`}>
					<ServiceCard data={item} />
				</Link>
			))}
		</div>
	);
}
