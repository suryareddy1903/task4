import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      {items.map(item => (
        <div key={item.product.id} className="flex items-center gap-4 py-4 border-b">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
        <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}