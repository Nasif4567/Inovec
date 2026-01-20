"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import useCartStore from "@/store/cartStore";
import Logo from "../ui/Logo/logo";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.items);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect to change background/text color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  if (!session) navLinks.push({ label: "Login / Sign up", href: "/login" });

  // Dynamic Styles based on scroll state
  const navBgPath = isScrolled 
    ? "bg-white/90 border-gray-200 shadow-md backdrop-blur-md" 
    : "bg-white/20 border-white/20 shadow-lg backdrop-blur-2xl";
  
  const textColor = isScrolled ? "text-gray-900" : "text-[#1a3a5f]";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center transition-all duration-300">
      <nav className={`w-[95%] max-w-6xl border transition-all duration-300 rounded-3xl px-5 py-3 flex items-center justify-between ${navBgPath}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`font-medium transition-colors hover:opacity-70 ${textColor} ${isActive ? "underline underline-offset-4" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <Link href="/cart" className={textColor}>
            <div className="relative hover:opacity-70 transition-opacity">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-in zoom-in">
                  {count}
                </span>
              )}
            </div>
          </Link>

          {session && (
            <div className="flex items-center gap-4 border-l pl-4 border-gray-300">
              <Link href="/profile" className={`flex items-center gap-2 font-medium ${textColor}`}>
                <User size={18} />
                {session.user?.name}
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className={textColor}>
            <div className="relative">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {count}
                </span>
              )}
            </div>
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className={textColor}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 w-[95%] max-w-6xl bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-900 font-semibold text-lg border-b border-gray-50 pb-2"
              >
                {link.label}
              </Link>
            ))}

            {session ? (
              <div className="flex flex-col gap-4 mt-2">
                <Link 
                  href="/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <User size={20} />
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full py-3 rounded-xl bg-red-50 text-red-700 font-bold"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;