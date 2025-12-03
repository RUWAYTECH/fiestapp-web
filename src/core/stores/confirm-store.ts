import { create } from 'zustand';

interface ConfirmOptions {
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
}

interface ConfirmState {
	open: boolean;
	options: ConfirmOptions | null;
	resolve?: (value: boolean) => void;
	confirm: (opts: ConfirmOptions) => Promise<boolean>;
	onConfirm: () => void;
	onCancel: () => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
	open: false,
	options: null,
	resolve: undefined,

	confirm: options => {
		return new Promise<boolean>(resolve => {
			set({ open: true, options, resolve });
		});
	},

	onConfirm: () => {
		const resolve = get().resolve;
		resolve?.(true);
		set({ open: false, options: null, resolve: undefined });
	},

	onCancel: () => {
		const resolve = get().resolve;
		resolve?.(false);
		set({ open: false, options: null, resolve: undefined });
	}
}));
