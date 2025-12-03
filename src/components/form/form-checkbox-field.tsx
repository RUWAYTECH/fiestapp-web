import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormCheckboxFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	label?: React.ReactNode;
	className?: string;
}

const FormCheckboxField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	label,
	className,
	...props
}: FormCheckboxFieldProps<TFieldValues, TName>) => {
	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem className={className}>
					<FormLabel>
						<FormControl>
							<Checkbox
								checked={!!field.value}
								onCheckedChange={value => field.onChange(value)}
								disabled={field.disabled || props.disabled}
							/>
						</FormControl>
						{label}
					</FormLabel>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormCheckboxField;
