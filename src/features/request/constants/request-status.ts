export enum RequestStatus {
	REQUESTED = 'REQUESTED',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED'
}

export const statusColor: Record<RequestStatus, string> = {
	[RequestStatus.REQUESTED]: 'bg-yellow-100 text-yellow-800',
	[RequestStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
	[RequestStatus.COMPLETED]: 'bg-green-100 text-green-800',
	[RequestStatus.CANCELLED]: 'bg-red-100 text-red-800'
};

export const statusLabel: Record<RequestStatus, string> = {
	[RequestStatus.REQUESTED]: 'Solicitado',
	[RequestStatus.IN_PROGRESS]: 'En Progreso',
	[RequestStatus.COMPLETED]: 'Completado',
	[RequestStatus.CANCELLED]: 'Cancelado'
};
