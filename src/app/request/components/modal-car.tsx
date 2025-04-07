'use client';

import { deleteFromCart, getCart } from '@/lib/cart-util';
import { CartRequestDto } from '@stateManagement/models/cart/cart-request.dto';
import { X } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [cart, setCart] = useState<CartRequestDto[]>([]);
  useEffect(() => {
    setCart(getCart());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Botón de cierre (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Tu Carrito</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay servicios en tu carrito.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {cart.map((item, index) => (
              <li
                key={index}
                className="border-b pb-2 flex justify-between items-center text-sm"
              >
                <span>{item.service.name}</span>
                <span className="text-gray-600">
                  S/ {item.total_price}
                </span>
                <button
                  onClick={() => {
                    deleteFromCart(item.id);
                    setCart(getCart()); // actualiza el estado luego de eliminar
                  }}
                  className="text-red-500 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartModal;
