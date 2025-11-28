import PaginationButton from '@/components/custom/pagination-button';
import { ServiceService } from '../services/service.service';
import { ServiceCard } from './service-card';
import Link from 'next/link';

interface ServiceListProps {
	q?: string;
	category?: string | string[];
	sort?: string;
	ubigeo?: string | string[];
	page?: number;
	hidePagination?: boolean;
}

export async function ServiceList({ q, category, sort, ubigeo, page = 1, hidePagination = false }: ServiceListProps) {
	const pageSize = 10;

	const res = await ServiceService.getAll({
		page,
		pageSize,
		search: q,
		categoryId: Array.isArray(category) ? category : category ? [category] : undefined,
		sortBy: sort as 'price' | 'rating' | undefined,
		ubigeoId: Array.isArray(ubigeo) ? ubigeo : ubigeo ? [ubigeo] : undefined
	});

	if (!res?.data || res.data.length === 0) {
		return <div>No se encontraron servicios.</div>;
	}

	const from = (res.pageOptions.page - 1) * res.pageOptions.pageSize + 1;
	const to = from + res.data.length - 1;
	const total = res.pageOptions.totalRows;

	return (
		<>
			{!hidePagination && (
				<div className="bg-accent text-accent-foreground py-2 px-4 rounded flex items-center justify-between gap-4 text-sm mb-4">
					<p className="flex-1">
						Mostrando {from}-{to} de {total} resultados
					</p>
					<PaginationButton page={page} totalPages={res.pageOptions.totalPages} />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{res.data.map(service => (
					<Link key={service.id} href={`/services/${service.id}`}>
						<ServiceCard data={service} />
					</Link>
				))}
			</div>
		</>
	);
}
