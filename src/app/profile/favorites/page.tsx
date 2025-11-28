import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ServiceCard } from '@/features/service/components/service-card';
import { ServiceService } from '@/features/service/services/service.service';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function FavoritesPage() {
	const session = await getServerSession(authOptions);
	const res = await ServiceService.getFavorites(session?.accessToken || '');

	if (!res?.data || res.data.length === 0) {
		return <div>Aún no tienes servicios en tu lista de favoritos.</div>;
	}

	return (
		<>
			<h1 className="text-2xl font-semibold mb-4 mt-10 md:mt-0">Mis favoritos</h1>
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
