import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	label?: React.ReactNode;
	placeholder?: string;
	autoComplete?: string;
}

const FormTextareaField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	label,
	placeholder,
	autoComplete = 'off',
	...props
}: FormTextareaFieldProps<TFieldValues, TName>) => {
	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea
							autoComplete={autoComplete}
							placeholder={placeholder}
							{...field}
							disabled={field.disabled || props.disabled}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormTextareaField;
