'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/core/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Filter, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { CategoryService } from '../services/category.service';
import { Checkbox } from '@/components/ui/checkbox';
/* import { Badge } from '@/components/ui/badge'; */

interface CategoryFilterDropdownProps {
	defaultSelected?: string[];
	onChange?: (options: string[]) => void;
}

export function CategoryFilterDropdown({ defaultSelected = [], onChange }: CategoryFilterDropdownProps) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search);

	const { data: categories = [], isFetching } = useQuery({
		queryKey: ['categories', debouncedSearch],
		queryFn: async () => {
			const res = await CategoryService.getAll({ page: 1, pageSize: 10, search: debouncedSearch });
			return res?.data || [];
		},
		staleTime: 5 * 60 * 1000
	});

	const handleToggleOption = (categoryId: string) => {
		const newOptions = selectedOptions.includes(categoryId)
			? selectedOptions.filter(id => id !== categoryId)
			: [...selectedOptions, categoryId];

		setSelectedOptions(newOptions);
		onChange?.(newOptions);
	};

	const handleClearAll = () => {
		setSelectedOptions([]);
		onChange?.([]);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="gap-2 bg-transparent">
					<Filter className="h-4 w-4" />
					Categorías
					{/* {selectedOptions.length > 0 && (
						<Badge variant="secondary" className="ml-1">
							{selectedOptions.length}
						</Badge>
					)} */}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-3" align="start">
				<div className="flex flex-col gap-3">
					<Input
						type="search"
						placeholder="Buscar categoría..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>

					{isFetching && (
						<div className="flex items-center justify-center py-4">
							<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
						</div>
					)}

					{!isFetching && categories.length === 0 && debouncedSearch && (
						<p className="text-sm text-muted-foreground text-center py-2">No se encontraron categorías</p>
					)}

					{!isFetching && categories.length === 0 && !debouncedSearch && (
						<p className="text-sm text-muted-foreground text-center py-2">Escribe para buscar categorías</p>
					)}

					{!isFetching && categories.length > 0 && (
						<div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
							{categories.map(category => (
								<label key={category.id} className="flex items-center gap-3 cursor-pointer">
									<Checkbox
										checked={selectedOptions.includes(category.id)}
										onCheckedChange={() => handleToggleOption(category.id)}
									/>
									<span className="text-sm">{category.name}</span>
								</label>
							))}
						</div>
					)}

					{selectedOptions.length > 0 && (
						<Button variant="ghost" size="sm" onClick={handleClearAll} className="text-muted-foreground">
							Limpiar filtro
						</Button>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
