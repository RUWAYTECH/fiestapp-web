import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/core/lib/utils';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

interface FormInputFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	type?: string;
	label?: React.ReactNode;
	placeholder?: string;
	autoComplete?: string;
	className?: string;
}

const FormInputField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	type,
	label,
	placeholder,
	autoComplete = 'off',
	className,
	...props
}: FormInputFieldProps<TFieldValues, TName>) => {
	return (
		<FormField
			control={props.control}
			name={props.name}
			render={({ field }) => (
				<FormItem className={cn('gap-1', className)}>
					{label && <FormLabel className="text-sm">{label}</FormLabel>}
					<FormControl>
						<Input
							type={type}
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

export default FormInputField;
