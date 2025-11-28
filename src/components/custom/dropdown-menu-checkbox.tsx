'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/core/lib/utils';
import { useState } from 'react';
import { Input } from '../ui/input';

interface DropdownItem {
	value: string;
	label: string;
	valueFormatter?: (item: Omit<DropdownItem, 'valueFormatter'>) => string;
}

interface DropdownMenuCheckboxProps {
	label: React.ReactNode;
	defaultChecked?: string[];
	items: DropdownItem[];
	onChange?: (values: string[]) => void;
	className?: string;
}

export function DropdownMenuCheckbox({
	label,
	items,
	defaultChecked = [],
	onChange,
	className
}: DropdownMenuCheckboxProps) {
	const [checkedItems, setCheckedItems] = useState<string[]>(defaultChecked);
	const [filteredItems, setFilteredItems] = useState<DropdownItem[]>(items);

	const handleCheckedChange = (value: string, isChecked: boolean) => {
		let updatedCheckedItems;
		if (isChecked) {
			updatedCheckedItems = [...checkedItems, value];
		} else {
			updatedCheckedItems = checkedItems.filter(item => item !== value);
		}
		setCheckedItems(updatedCheckedItems);
		onChange?.(updatedCheckedItems);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('w-56', className)}>
				<DropdownMenuLabel>
					<Input
						placeholder="Search..."
						onChange={e => {
							const searchTerm = e.target.value.toLowerCase();
							setFilteredItems(items.filter(item => item.label.toString().toLowerCase().includes(searchTerm)));
						}}
					/>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{filteredItems.map(item => (
					<DropdownMenuCheckboxItem
						key={item.value}
						checked={checkedItems.includes(item.value)}
						onCheckedChange={isChecked => handleCheckedChange(item.value, isChecked)}
					>
						{item.valueFormatter ? item.valueFormatter(item) : item.label}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
