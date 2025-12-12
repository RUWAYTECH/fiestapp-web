import { format } from 'date-fns';

export function formatShowDate(date: Date) {
	const d = new Date(date);
	return d.toLocaleDateString('es-PE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function formatDDMMYYYY(date: Date) {
	return format(date, 'dd/MM/yyyy');
}
