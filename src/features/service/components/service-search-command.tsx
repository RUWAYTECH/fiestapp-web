'use client';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useDebounce } from '@/core/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { ServiceService } from '../services/service.service';

export function ServiceSearchCommand() {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search);

	const { data, isFetching } = useQuery({
		queryKey: ['services', debouncedSearch],
		queryFn: async () => {
			const res = await ServiceService.getAll({ page: 1, pageSize: 10, search: debouncedSearch });
			return res?.data || [];
		},
		enabled: debouncedSearch.length > 0,
		staleTime: 5 * 60 * 1000 // 5 minutos
	});

	return (
		<div className="mx-auto w-full max-w-[90vw] sm:max-w-[40vw]">
			<Command className="border rounded-lg shadow-md">
				<CommandInput placeholder="Busca un servicio..." value={search} onValueChange={setSearch} className="w-full" />
				{isFetching && <div className="p-4 text-sm text-muted-foreground">Cargando...</div>}
				{!isFetching && search.length > 0 && (
					<CommandList className="border-t rounded-b-lg shadow-sm max-h-60 overflow-auto">
						<CommandEmpty>No se encontraron servicios.</CommandEmpty>
						<CommandGroup heading="Servicios">
							{data?.map(service => (
								<CommandItem key={service.id} value={service.name} asChild>
									<Link href={`/services/${service.id}`} passHref>
										{service.name}
									</Link>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				)}
			</Command>
		</div>
	);
}
