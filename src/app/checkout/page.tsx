'use client'

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    shippingAddress: '',
    billingAddress: '',
    paymentMethod: 'bank_transfer',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!orderData.shippingAddress || !orderData.billingAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate order placement
      setTimeout(() => {
        toast.success('Order placed successfully!');
        clearCart();
        setIsProcessing(false);
        // In a real app, redirect to order confirmation page
      }, 2000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* User Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <p className="mt-1 text-gray-900">{user?.companyName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-gray-900">{user?.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <textarea
                    name="shippingAddress"
                    value={orderData.shippingAddress}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your complete shipping address..."
                    required
                  />
                </div>

                {/* Billing Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                  <textarea
                    name="billingAddress"
                    value={orderData.billingAddress}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your billing address..."
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <select
                    name="paymentMethod"
                    value={orderData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                    <option value="credit_card">Credit Card</option>
                  </select>
                </div>

                {/* Order Notes */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
                  <textarea
                    name="notes"
                    value={orderData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special instructions for this order..."
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.product.name}</h3>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium text-sm">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span>{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-700">৳{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
