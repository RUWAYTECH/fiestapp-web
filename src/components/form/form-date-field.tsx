'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/core/lib/utils';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { useState } from 'react';

interface FormDateFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	label?: React.ReactNode;
	placeholder?: string;
	className?: string;
}

const FormDateField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	label,
	placeholder,
	className,
	...props
}: FormDateFieldProps<TFieldValues, TName>) => {
	const [open, setOpen] = useState(false);

	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem className={cn('gap-1', className)}>
					{label && <FormLabel className="text-sm">{label}</FormLabel>}
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="justify-between font-normal"
									disabled={field.disabled || props.disabled}
								>
									{field.value ? (field.value as Date).toLocaleDateString() : placeholder || 'Selecciona una fecha'}
									<CalendarIcon />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto overflow-hidden p-0" align="start">
								<Calendar
									mode="single"
									selected={(field.value || undefined) as Date | undefined}
									captionLayout="dropdown"
									onSelect={date => {
										field.onChange(date);
										setOpen(false);
									}}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormDateField;
