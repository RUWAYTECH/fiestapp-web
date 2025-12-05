import { Container } from '@/components/custom/container';
import { CategoryList } from '@/features/home/components/category-list';
import { CategoryListSkeleton } from '@/features/home/components/category-list-skeleton';
import { ServiceList } from '@/features/home/components/service-list';
import { ServiceListSkeleton } from '@/features/home/components/service-list-skeleton';
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
				<h4 className="mb-4 text-xl font-bold sm:text-2xl">Categorías populares</h4>
				<Suspense fallback={<CategoryListSkeleton />}>
					<CategoryList />
				</Suspense>
			</Container>
			<Container as="section" className="mt-8">
				<h4 className="mb-4 text-xl font-bold sm:text-2xl">Servicios populares</h4>
				<Suspense fallback={<ServiceListSkeleton />}>
					<ServiceList />
				</Suspense>
			</Container>
		</>
	);
}
