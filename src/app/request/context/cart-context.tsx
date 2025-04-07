import { STORAGE_KEYS } from "@constants/storageKeys";
import { ServiceResponseDto } from "@stateManagement/models/service/create";
import { usePathname } from "next/navigation";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

// Definir el tipo de servicio directamente como ServiceResponseDto
interface CartContextType {
	cart: ServiceResponseDto[]; // El carrito contiene objetos de tipo ServiceResponseDto
	addToCart: (service: ServiceResponseDto) => void; // Acepta directamente un objeto ServiceResponseDto
	clearCart: () => void;
	handleRouteChange: (route: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
	const [cart, setCart] = useState<ServiceResponseDto[]>([]);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [nextRoute, setNextRoute] = useState<string | null>(null);

	const pathname = usePathname();

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
	}, [cart]);

	// Detectar cambio de ruta para limpiar el carrito cuando se salga de /service/:id
	useEffect(() => {
		const match = pathname.match(/^\/service\/([^\/]+)$/);
		const currentServiceId = match ? match[1] : null;
	}, [pathname, cart]);

	const addToCart = (service: ServiceResponseDto) => {
		setCart((prev) => [...prev, service]);
	};

	const clearCart = () => {
		setCart([]);
		localStorage.removeItem(STORAGE_KEYS.CART);
	};

	const confirmClearCart = (confirm: boolean) => {
		if (confirm) clearCart();
		setShowConfirmModal(false);

		// Usamos router.push solo si se ha configurado una ruta para redirigir
		if (nextRoute) {
			window.location.href = nextRoute; // Redirigir sin usar useRouter
		}
	};

	const handleRouteChange = (route: string) => {
		setNextRoute(route);
		setShowConfirmModal(true);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, clearCart, handleRouteChange }}
		>
			{children}

			{showConfirmModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white p-5 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold">¿Vaciar carrito?</h2>
						<p>
							Si sales de la pantalla de servicios, se perderán los productos.
						</p>
						<div className="mt-4 flex justify-end gap-2">
							<button
								className="bg-gray-300 px-4 py-2 rounded"
								onClick={() => confirmClearCart(false)}
							>
								Cancelar
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded"
								onClick={() => confirmClearCart(true)}
							>
								Vaciar y salir
							</button>
						</div>
					</div>
				</div>
			)}
		</CartContext.Provider>
	);
};

// Hook para usar el carrito
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart debe ser usado dentro de un CartProvider");
	}
	return context;
};
