'use client';

import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { ServiceResDto } from '../dto/responses/service-res.dto';
import { useCart } from '@/features/cart/stores/cart';
import { useMutation } from '@tanstack/react-query';
import { ServiceService } from '../services/service.service';
import { dispatchToast } from '@/core/lib/toast';
import { ApiResponse, ApiResponseMessage, ResponseMessageEnum } from '@/types/api-response.dto';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { setToken } from '@/core/config/axios-config';
import { useConfirmStore } from '@/core/stores/confirm-store';

interface ServiceCardActionsProps {
	service: ServiceResDto;
}

export function ServiceCardActions({ service }: ServiceCardActionsProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { items, addItem, deleteWithDifferentProvider } = useCart();
	const { data } = useSession();
	const confirm = useConfirmStore(s => s.confirm);

	const favoriteMutation = useMutation<ApiResponse<null>, ApiResponse<null>, string>({
		mutationFn: async (id: string) => {
			try {
				const res = await ServiceService.toogleFavorite(id);
				return res;
			} catch (err) {
				const error = err as Error | ApiResponse<null>;
				const msgs: ApiResponseMessage[] = [];

				if (error instanceof Error) {
					msgs.push({ message: error.message, type: ResponseMessageEnum.ERROR });
				} else if ('messages' in error) {
					msgs.push(...error.messages);
				}

				throw { data: null, messages: msgs };
			}
		}
	});

	const handleAddToCart = async () => {
		const existWithDifferentProvider = items.find(item => item.providerId !== service.provider.id);

		if (existWithDifferentProvider) {
			const confirmed = await confirm({
				title: '¿Estás seguro?',
				description:
					'Al añadir este servicio al carrito, se eliminarán los servicios de otros proveedores. ¿Deseas continuar?',
				confirmText: 'Sí, continuar',
				cancelText: 'No, cancelar'
			});

			if (!confirmed) {
				return;
			}

			deleteWithDifferentProvider(service.provider.id);
		}

		addItem({
			id: service.id,
			name: service.name,
			description: service.description,
			priceMin: service.priceMin,
			priceMax: service.priceMax,
			image: service.images?.[0] || '',
			category: '',
			providerId: service.provider.id
		});
	};

	const handleToggleFavorite = () => {
		if (!data?.user || !data?.accessToken) {
			dispatchToast.error('Debes iniciar sesión para agregar a favoritos');
			router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
			return;
		}

		setToken(data.accessToken);

		favoriteMutation.mutate(service.id, {
			onError: res => {
				dispatchToast.apiRes(res);
			},
			onSuccess: res => {
				dispatchToast.apiRes(res);
			}
		});
	};

	return (
		<>
			<Button onClick={handleAddToCart}>
				<ShoppingCart className="size-4.5" />
				Agregar a la solcitud
			</Button>
			<Button variant="outline" onClick={handleToggleFavorite} disabled={favoriteMutation.isPending}>
				<Heart className="size-4.5" />
				Agregar a favoritos
			</Button>
		</>
	);
}
