import { Container } from '@/components/custom/container';
import { Badge } from '@/components/ui/badge';
import { ServiceCardActions } from '@/features/service/components/service-card-actions';
import { ServiceGallery } from '@/features/service/components/service-gallery';
import { ServiceList } from '@/features/service/components/service-list';
import { ServiceService } from '@/features/service/services/service.service';
import { MapPin, Star } from 'lucide-react';
import { Metadata } from 'next';

interface ServicePageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
	const resolvedParams = await params;
	const response = await ServiceService.getById(resolvedParams.id);

	if (!response?.data) {
		return {
			title: 'Servicio no encontrado'
		};
	}

	const service = response.data;

	return {
		title: `${service.name} - ${service.provider.name}`,
		description:
			service.description?.slice(0, 160) ||
			`Contrata ${service.name} para tu próxima fiesta. Precios desde S/${service.priceMin}`,
		openGraph: {
			title: service.name,
			description: service.description,
			images: service.images?.[0] ? [{ url: service.images[0] }] : []
		}
	};
}

export default async function ServicePage({ params }: ServicePageProps) {
	const resolvedParams = await params;
	const response = await ServiceService.getById(resolvedParams.id);

	if (!response || !response.data) {
		return (
			<Container>
				<div>Lo sentimos, el servicio que buscas no existe o ha sido eliminado.</div>
			</Container>
		);
	}

	const service = response.data;

	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<section>
					<ServiceGallery images={service.images || []} />
				</section>
				<section>
					<h1 className="text-3xl font-bold mb-2">{service.name}</h1>
					<div className="flex items-center mb-4">
						{[...Array(5)].map((_, index) => (
							<Star key={index} size={20} className={index < service.score ? 'text-yellow-500' : 'text-gray-300'} />
						))}
					</div>
					<p className="text-gray-600 mb-4">{service.description}</p>
					<div className="flex gap-6 mb-4 flex-wrap">
						<p className="text-xl font-bold">
							Desde <span className="font-normal text-2xl text-primary">S/ {service.priceMin}</span>
						</p>
						<p className="text-xl font-bold">
							Hasta <span className="font-normal text-2xl text-primary">S/ {service.priceMax}</span>
						</p>
					</div>
					<Badge variant="outline" className="mb-4 text-blue-600">
						{service.provider.name}
					</Badge>
					<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
						<MapPin size={20} />
						<span>{service.address}</span>
					</div>
					<div className="flex gap-4">
						<ServiceCardActions service={service} />
					</div>
				</section>
			</div>
			<h2 className="text-2xl font-bold mb-4 mt-20">Servicios relacionados</h2>
			<ServiceList category={[service.categoryId]} hidePagination />
		</Container>
	);
}
