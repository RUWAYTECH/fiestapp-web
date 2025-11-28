'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDebounce } from '@/core/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Filter, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { UbigeoService } from '../services/ubigeo.service';
import { Checkbox } from '@/components/ui/checkbox';

interface UbigeoFilterDropdownProps {
	defaultSelected?: string[];
	onChange?: (options: string[]) => void;
}

export function UbigeoFilterDropdown({ defaultSelected = [], onChange }: UbigeoFilterDropdownProps) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search);

	const { data: ubigeos = [], isFetching } = useQuery({
		queryKey: ['ubigeos', debouncedSearch],
		queryFn: async () => {
			const res = await UbigeoService.getAll({ page: 1, pageSize: 10, search: debouncedSearch });
			return res?.data || [];
		},
		staleTime: 5 * 60 * 1000
	});

	const handleToggleOption = (ubigeoId: string) => {
		const newOptions = selectedOptions.includes(ubigeoId)
			? selectedOptions.filter(id => id !== ubigeoId)
			: [...selectedOptions, ubigeoId];

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
					Ubigeos
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

					{!isFetching && ubigeos.length === 0 && debouncedSearch && (
						<p className="text-sm text-muted-foreground text-center py-2">No se encontraron ubigeos</p>
					)}

					{!isFetching && ubigeos.length === 0 && !debouncedSearch && (
						<p className="text-sm text-muted-foreground text-center py-2">Escribe para buscar ubigeos</p>
					)}

					{!isFetching && ubigeos.length > 0 && (
						<div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
							{ubigeos.map(ubigeo => (
								<label key={ubigeo.id} className="flex items-center gap-3 cursor-pointer">
									<Checkbox
										checked={selectedOptions.includes(ubigeo.id)}
										onCheckedChange={() => handleToggleOption(ubigeo.id)}
									/>
									<span className="text-sm">
										{ubigeo.department + ' | ' + ubigeo.province + ' | ' + ubigeo.district}
									</span>
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
