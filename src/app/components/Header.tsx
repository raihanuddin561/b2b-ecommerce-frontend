'use client'

import Link from "next/link";
import SearchBar from "./search/search";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm gap-4 flex-wrap bg-slate-100">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-800 cursor-pointer">Kuttush</h1>
      </Link>

      {/* SearchBar */}
      <div className="flex-1 min-w-[200px] max-w-[500px] mx-auto">
        <SearchBar />
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-4 text-sm text-gray-700">
        <Link href="/products" className="hover:text-blue-700 font-medium">Products</Link>
        <CartIcon />
        <Link href="/auth/login" className="hover:text-blue-700 font-medium">Login</Link>
        <Link href="/auth/register" className="hover:text-blue-700 font-medium">Register</Link>
      </nav>
    </header>
  );
}
