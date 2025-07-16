'use client'

import Link from "next/link";
import SearchBar from "./search/search";
import CartIcon from "./CartIcon";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";
import NoSSR from "./NoSSR";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useWishlist();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

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
        <Link href="/products" className="hover:text-blue-700 font-medium cursor-pointer">Products</Link>
        <Link href="/compare" className="hover:text-blue-700 font-medium cursor-pointer">Compare</Link>
        
        {/* Wishlist Icon */}
        <Link href="/wishlist" className="relative hover:text-blue-700 font-medium cursor-pointer">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Wishlist</span>
          </div>
          <NoSSR>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </NoSSR>
        </Link>
        
        <CartIcon />
        
        <NoSSR>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:text-blue-700 font-medium cursor-pointer"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user?.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-blue-700 font-medium cursor-pointer">Login</Link>
              <Link href="/auth/register" className="hover:text-blue-700 font-medium cursor-pointer">Register</Link>
            </>
          )}
        </NoSSR>
      </nav>
    </header>
  );
}
