import { Container } from '@/components/custom/container';
import { CategoryList } from '@/features/home/components/category-list';
import { ServiceList } from '@/features/home/components/service-list';
import { ServiceSearchCommand } from '@/features/service/components/service-search-command';
import { Suspense } from 'react';

export default function Home() {
	return (
		<>
			<Container as="section" className="my-10">
				<h1 className="text-3xl font-extrabold tracking-tight text-center sm:text-4xl">
					Encuentra todo para tu fiesta en un solo lugar
				</h1>
				<h2 className="my-2 text-2xl text-center text-muted-foreground sm:text-3xl">
					Locales, decoración, tortas, animación y más para eventos inolvidables
				</h2>
			</Container>
			<ServiceSearchCommand />
			<Container as="section" className="mt-8">
				<h3 className="mb-4 text-2xl font-bold sm:text-3xl">Categorías populares</h3>
				<Suspense fallback={<div>Cargando categorías...</div>}>
					<CategoryList />
				</Suspense>
			</Container>
			<Container as="section" className="mt-8">
				<h3 className="mb-4 text-2xl font-bold sm:text-3xl">Servicios populares</h3>
				<Suspense fallback={<div>Cargando servicios...</div>}>
					<ServiceList />
				</Suspense>
			</Container>
		</>
	);
}
