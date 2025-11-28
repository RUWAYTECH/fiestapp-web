export function formatShowDate(date: Date) {
	const d = new Date(date);
	return d.toLocaleDateString('es-PE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
