import { format as formatDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	FormControl,
	FormDescription,
	FormMessage,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface DatePickerFieldProps extends ControllerRenderProps {
	label?: string
	description?: string
	disabled?: boolean
	min?: Date
	max?: Date
	formatString?: string
	placeholder?: string
}

export function DatePickerField({
	label = 'Select date',
	description,
	disabled = false,
	min,
	max,
	formatString = 'dd/MM/yyyy',
	placeholder = 'Seleccionar fecha',
	...props
}: DatePickerFieldProps) {
	return (
		<FormItem className="flex flex-col">
			{label && <FormLabel>{label}</FormLabel>}
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							type="button"
							variant={'outline'}
							className={cn(
								'w-full pl-3 text-left font-normal',
								!props.value && 'text-muted-foreground'
							)}
							disabled={disabled}
						>
							{props.value ? formatDate(props.value, formatString) : <span>{placeholder}</span>}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={props.value}
						onSelect={(date) => {
							props.onChange(date)
							props.onBlur()
						}}
						fromDate={min}
						toDate={max}
						disabled={disabled}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</FormItem>
	)
}