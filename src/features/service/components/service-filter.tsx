'use client';

import { Input } from '@/components/ui/input';
import { CategoryFilterDropdown } from '@/features/category/components/category-filter-dropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { ServiceSortDropdown } from './service-sort-dropdown';
import { UbigeoFilterDropdown } from '@/features/ubigeo/components/ubigeo-filter-dropdown';
import { CATEGORY_PARAM_KEY, SEARCH_PARAM_KEY, SORT_PARAM_KEY, UBIGEO_PARAM_KEY } from '../constants/search-params';

export function ServiceFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [searchTerm, setSearchTerm] = useState(searchParams.get(SEARCH_PARAM_KEY) || '');

	const updateSearchParams = useCallback(
		(search: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (search) {
				params.set(SEARCH_PARAM_KEY, search);
			} else {
				params.delete(SEARCH_PARAM_KEY);
			}
			router.replace(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		updateSearchParams(value);
	};

	const handleCategoryChange = (selectedCategories: string[]) => {
		const params = new URLSearchParams(searchParams.toString());
		if (selectedCategories.length > 0) {
			params.delete(CATEGORY_PARAM_KEY);
			selectedCategories.forEach(category => {
				params.append(CATEGORY_PARAM_KEY, category);
			});
		} else {
			params.delete(CATEGORY_PARAM_KEY);
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	const handleSortChange = (sortOption: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (sortOption) {
			params.set(SORT_PARAM_KEY, sortOption);
		} else {
			params.delete(SORT_PARAM_KEY);
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	const handleUbigeoChange = (selectedUbigeos: string[]) => {
		const params = new URLSearchParams(searchParams.toString());
		if (selectedUbigeos.length > 0) {
			params.delete(UBIGEO_PARAM_KEY);
			selectedUbigeos.forEach(ubigeo => {
				params.append(UBIGEO_PARAM_KEY, ubigeo);
			});
		} else {
			params.delete(UBIGEO_PARAM_KEY);
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center gap-4">
			<Input placeholder="Buscar servicios..." value={searchTerm} onChange={handleSearchChange} />
			<div className="flex items-center gap-2 md:ml-auto">
				<CategoryFilterDropdown
					defaultSelected={searchParams.getAll(CATEGORY_PARAM_KEY)}
					onChange={handleCategoryChange}
				/>
				<ServiceSortDropdown
					defaultSelected={searchParams.get(SORT_PARAM_KEY) || undefined}
					onChange={handleSortChange}
				/>
				<UbigeoFilterDropdown defaultSelected={searchParams.getAll(UBIGEO_PARAM_KEY)} onChange={handleUbigeoChange} />
			</div>
		</div>
	);
}
