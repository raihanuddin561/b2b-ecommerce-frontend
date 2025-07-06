// app/page.tsx

import Link from "next/link";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import ToastTest from "./components/ToastTest";
import { Product } from "@/types/cart";

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Baby Frock",
    price: 390.00,
    minOrderQuantity: 5,
    companyName: "Kuttush Baby Shop",
    imageUrl: "/images/products/baby-items/dress/baby-frock-1.jpg"
  },
  {
    id: 2,
    name: "Puzzle game for kids",
    price: 780.00,
    minOrderQuantity: 2,
    companyName: "Kuttush Baby Shop",
    imageUrl: "/images/products/baby-items/toys/puzzle-game.webp"
  },
  {
    id: 3,
    name: "Sleeveless Korean style Baby Dress",
    price: 1380.00,
    minOrderQuantity: 1,
    companyName: "Kuttush Baby shop",
    imageUrl: "/images/products/baby-items/dress/sleeveless-baby-dress.jpg"
  },
  {
    id: 4,
    name: "Bluetooth Headphone",
    price: 2500.00,
    minOrderQuantity: 10,
    companyName: "S Tech Electronics",
    imageUrl: "/images/products/electronics/headphones/JR-OH1-Bluetooth-Headphone.webp"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Header />
      
      {/* Toast Test Component - Remove this after testing */}
      <div className="bg-yellow-100 border border-yellow-400 p-4 text-center">
        <p className="text-sm text-yellow-800 mb-2">Test the toast notifications:</p>
        <ToastTest />
      </div>

      {/* Hero + Search public/images/banners/banner.jpg */}
      <section className="bg-gray-50 py-16 text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Grow Your Business with <span className="text-blue-800">KUTTUSH B2B</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Connect with verified wholesalers and retailers
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/auth/register" className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-red-600">
            Register Company
          </Link>
          <Link href="/products" className="border border-gray-400 px-6 py-3 rounded-xl font-semibold text-gray-800 hover:bg-gray-100">
            Explore Products
          </Link>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Image src="/images/products/electronics/headphones/JR-OH1-Bluetooth-Headphone.webp" alt="Electronics" width={100} height={100} className="mx-auto rounded" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Electronics</p>
          </div>
          <div className="text-center">
            <Image src="/images/products/baby-items/dress/sleeveless-baby-dress.jpg" alt="Clothing" width={100} height={100} className="mx-auto rounded" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Clothing</p>
          </div>
          <div className="text-center">
            <Image src="/images/products/baby-items/toys/puzzle-game.webp" alt="Toy" width={100} height={100} className="mx-auto rounded" />
            <p className="mt-2 text-sm font-semibold text-gray-800">Baby Toys</p>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-100 text-center">
        <h3 className="text-2xl font-semibold mb-8">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {[
            'Register your company on Kuttush',
            'Add your products and pricing',
            'Start receiving and managing orders'
          ].map((step, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">{idx + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to scale?</h3>
        <p className="mb-6">Join Kuttush today and reach thousands of verified B2B buyers.</p>
        <Link href="/auth/register" className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-gray-100">Become a Vendor</Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t mt-12">
        © {new Date().getFullYear()} Kuttush B2B. All rights reserved.
      </footer>
    </main>
  );
}
