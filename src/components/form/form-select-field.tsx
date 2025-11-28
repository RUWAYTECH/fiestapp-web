import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/core/lib/utils';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormSelectOptionItem {
	value: string;
	label: string;
}

interface FormSelectFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	label?: React.ReactNode;
	placeholder?: string;
	className?: string;
	options: FormSelectOptionItem[];
	onChange?: (value: string) => void;
}

const FormSelectField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	label,
	className,
	placeholder,
	options,
	onChange,
	...props
}: FormSelectFieldProps<TFieldValues, TName>) => {
	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem className="gap-1">
					{label && <FormLabel className="text-sm">{label}</FormLabel>}
					<Select
						value={field.value}
						onValueChange={value => {
							field.onChange(value);
							onChange?.(value);
						}}
						disabled={field.disabled}
					>
						<FormControl>
							<SelectTrigger className={cn('w-full', className)}>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map(option => {
								return (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormSelectField;
