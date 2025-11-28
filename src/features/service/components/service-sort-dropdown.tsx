'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SortAsc } from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ServiceSortDropdownProps {
	defaultSelected?: string;
	onChange?: (options: string) => void;
}

export function ServiceSortDropdown({ defaultSelected, onChange }: ServiceSortDropdownProps) {
	const [selectedOption, setSelectedOption] = useState<'price' | 'valoration' | ''>(
		['price', 'valoration'].includes(defaultSelected || '') ? (defaultSelected as 'price' | 'valoration') : ''
	);

	const handleClear = () => {
		setSelectedOption('');
		onChange?.('');
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="gap-2 bg-transparent">
					<SortAsc className="h-4 w-4" />
					Ordenar
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-3" align="start">
				<div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
					<RadioGroup
						value={selectedOption}
						onValueChange={(value: 'price' | 'valoration') => {
							setSelectedOption(value);
							onChange?.(value);
						}}
					>
						<label className="flex items-center gap-3 cursor-pointer">
							<RadioGroupItem value="price" />
							<span className="text-sm">Precio más bajo</span>
						</label>
						<label className="flex items-center gap-3 cursor-pointer">
							<RadioGroupItem value="valoration" />
							<span className="text-sm">Mejor valoración</span>
						</label>
					</RadioGroup>
				</div>

				{selectedOption && (
					<Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground mt-3 w-full">
						Limpiar filtro
					</Button>
				)}
			</PopoverContent>
		</Popover>
	);
}
