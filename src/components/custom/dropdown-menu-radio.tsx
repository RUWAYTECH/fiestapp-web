'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/core/lib/utils';
import { useState } from 'react';

interface DropdownItem {
	value: string;
	label: React.ReactNode;
}

interface DropdownMenuRadioProps {
	label: React.ReactNode;
	defaultChecked?: string;
	items: DropdownItem[];
	onChange?: (values: string) => void;
	className?: string;
}

export function DropdownMenuRadio({ label, items, defaultChecked, onChange, className }: DropdownMenuRadioProps) {
	const [value, setValue] = useState<string | undefined>(defaultChecked);

	const handleValueChange = (newValue: string) => {
		setValue(newValue);
		onChange?.(newValue);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{label}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('w-56', className)}>
				<DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
					{items.map(item => (
						<DropdownMenuRadioItem key={item.value} value={item.value}>
							{item.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
