import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Container } from '@/components/custom/container';
import PaginationButton from '@/components/custom/pagination-button';
import { RequestCard } from '@/features/request/components/request-card';
import { RequestService } from '@/features/request/services/request.service';
import { getServerSession } from 'next-auth';

export default async function RequestsPage() {
	const session = await getServerSession(authOptions);
	const res = await RequestService.getAll(session?.accessToken || '');
	const { data, pageOptions } = res || {};

	return (
		<Container>
			<h1 className="text-xl font-bold">Mis Cotizaciones</h1>
			<p className="text-sm text-muted-foreground">Aquí puedes gestionar tus cotizaciones.</p>
			<div className="px-4 py-2 bg-accent rounded flex items-center mt-6 mb-3 gap-3">
				<h2 className="font-semibold flex-1">Cotizaciones Realizadas</h2>
				<PaginationButton page={Number(pageOptions?.page) || 1} totalPages={Number(pageOptions?.totalPages) || 1} />
			</div>
			{data && data.length > 0 ? (
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.map(request => (
						<RequestCard key={request.id} request={request} />
					))}
				</ul>
			) : (
				<p>No orders found.</p>
			)}
		</Container>
	);
}
