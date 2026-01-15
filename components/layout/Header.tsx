"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import Logo from "../ui/Logo/logo";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.items);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isLight, setIsLight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // ===== Detect visible section =====
  const checkVisibleSection = () => {
    const sections = document.querySelectorAll("section[data-header-theme]");
    const center = window.innerHeight / 2;

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= center && rect.bottom >= center) {
        setIsLight(sec.getAttribute("data-header-theme") !== "dark");
      }
    });
  };

  useEffect(() => {
    setTimeout(checkVisibleSection, 50);
  }, [pathname]);

  useEffect(() => {
    checkVisibleSection();
    window.addEventListener("scroll", checkVisibleSection);
    return () => window.removeEventListener("scroll", checkVisibleSection);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  if (!session) navLinks.push({ label: "Login / Sign up", href: "/login" });

  const textColor = isLight
    ? "text-gray-900 hover:text-yellow-500"
    : "text-white hover:text-yellow-300";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      <nav className="w-[95%] max-w-6xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-lg rounded-3xl px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 rounded-2xl">
          <Logo/>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`font-medium ${textColor}`}>
              {link.label}
            </Link>
          ))}
          
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

          {session && (
            <>
              <Link href="/profile" className={`flex items-center gap-2 ${textColor}`}>
                <User size={18} />
                {session.user?.name}
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
              >
                Sign out
              </button>
            </>
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

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={26} className={isLight ? "text-gray-900" : "text-white"} />
            ) : (
              <Menu size={26} className={isLight ? "text-gray-900" : "text-white"} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 w-[95%] max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-900 font-medium text-lg"
              >
                {link.label}
              </Link>
            ))}

            {session && (
  <>
    {/* Change href from "/" to "/profile" */}
    <Link href="/profile" className={`flex items-center gap-2 ${textColor}`}>
      <User size={18} />
      {session.user?.name}
    </Link>

    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
    >
      Sign out
    </button>
  </>
)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
