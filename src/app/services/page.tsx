import { Container } from '@/components/custom/container';
import { ServiceFilter } from '@/features/service/components/service-filter';
import { ServiceList } from '@/features/service/components/service-list';
import {
	CATEGORY_PARAM_KEY,
	SEARCH_PARAM_KEY,
	SORT_PARAM_KEY,
	UBIGEO_PARAM_KEY
} from '@/features/service/constants/search-params';
import { Suspense } from 'react';

interface ServicesPageProps {
	searchParams: Promise<{
		[SEARCH_PARAM_KEY]?: string;
		[CATEGORY_PARAM_KEY]?: string[] | string;
		[SORT_PARAM_KEY]?: string;
		[UBIGEO_PARAM_KEY]?: string[] | string;
	}>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
	const resolvedParams = await searchParams;
	return (
		<Container>
			<ServiceFilter />
			<div className="mt-6">
				<Suspense fallback={<div>Loading services...</div>}>
					<ServiceList
						q={resolvedParams[SEARCH_PARAM_KEY]}
						category={resolvedParams[CATEGORY_PARAM_KEY]}
						sort={resolvedParams[SORT_PARAM_KEY]}
						ubigeo={resolvedParams[UBIGEO_PARAM_KEY]}
					/>
				</Suspense>
			</div>
		</Container>
	);
}
