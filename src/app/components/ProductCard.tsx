'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types/cart';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Ensure quantity meets minimum order requirement
    const finalQuantity = Math.max(quantity, product.minOrderQuantity);
    
    try {
      addToCart(product, finalQuantity);
      toast.success(`Added ${finalQuantity} ${product.name}(s) to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || product.minOrderQuantity;
    setQuantity(Math.max(newQuantity, product.minOrderQuantity));
  };

  return (
    <div className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition-shadow relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 z-10 cursor-pointer"
      >
        <svg 
          className={`w-4 h-4 ${isClient && isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          fill={isClient && isInWishlist(product.id) ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-32 object-cover rounded mb-2"
      />
      
      <h4 className="text-md font-semibold mb-1">{product.name}</h4>
      <p className="text-sm text-gray-600 mb-1">MOQ: {product.minOrderQuantity}</p>
      <div className="flex items-center justify-between mb-1">
        <p className="text-lg text-blue-700 font-bold">৳{product.price.toLocaleString()}</p>
        {product.rating && (
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        )}
      </div>
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
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
          suppressHydrationWarning
        />
      </div>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        suppressHydrationWarning
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      
      {/* Total Price Preview */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Total: ৳{isClient ? (product.price * quantity).toLocaleString() : (product.price * product.minOrderQuantity).toLocaleString()}
      </p>
    </div>
  );
}
