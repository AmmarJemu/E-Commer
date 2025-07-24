"use client"
import React from "react";
import { assets, CartIcon, BagIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/about" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Image className="w-4 h-4 cursor-pointer" src={assets.search_icon} alt="search icon" />
        
        {user ? (
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                userButtonPopoverCard: "shadow-lg rounded-lg",
                userButtonTrigger: "focus:shadow-none"
              }
            }}>
              <UserButton.UserProfileLink url="/cart" label="My Cart" labelIcon={<CartIcon />} />
              <UserButton.UserProfileLink url="/my-orders" label="My Orders" labelIcon={<BagIcon />} />
            </UserButton>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => openSignIn()} 
              className="flex items-center gap-1 hover:text-gray-900 transition text-sm"
            >
              <Image src={assets.user_icon} alt="user icon" width={16} height={16} />
              Sign In
            </button>
            <span className="text-gray-400">|</span>
            <SignUpButton mode="modal">
              <button className="text-sm hover:text-gray-900 transition">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;