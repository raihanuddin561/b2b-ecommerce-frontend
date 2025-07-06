'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/cart';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Ensure quantity meets minimum order requirement
    const finalQuantity = Math.max(quantity, product.minOrderQuantity);
    
    try {
      addToCart(product, finalQuantity);
      // Optional: Show success message
       toast.success(`Added ${finalQuantity} ${product.name}(s) to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || product.minOrderQuantity;
    setQuantity(Math.max(newQuantity, product.minOrderQuantity));
  };

  return (
    <div className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition-shadow">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-32 object-cover rounded mb-2"
      />
      
      <h4 className="text-md font-semibold mb-1">{product.name}</h4>
      <p className="text-sm text-gray-600 mb-1">MOQ: {product.minOrderQuantity}</p>
      <p className="text-lg text-blue-700 font-bold mb-1">৳{product.price}</p>
      <p className="text-xs text-gray-500 mb-3">{product.companyName}</p>
      
      {/* Quantity Input */}
      <div className="mb-3">
        <label htmlFor={`quantity-${product.id}`} className="block text-xs text-gray-600 mb-1">
          Quantity (Min: {product.minOrderQuantity})
        </label>
        <input
          id={`quantity-${product.id}`}
          type="number"
          min={product.minOrderQuantity}
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      
      {/* Total Price Preview */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Total: ৳{(product.price * quantity).toLocaleString()}
      </p>
    </div>
  );
}
