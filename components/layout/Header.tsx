"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/resources/Letterhead.png";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User,ShoppingCart } from "lucide-react";


const Header: React.FC = () => {
  const pathname = usePathname(); // Detects route changes
  const [isLight, setIsLight] = useState(true);
  const { data: session } = useSession();

  // Function: detect which section is visible
  const checkVisibleSection = () => {
    const sections = Array.from(
      document.querySelectorAll("section[data-header-theme]")
    );

    if (!sections.length) return;

    const viewportCenter = window.innerHeight / 2;

    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();

      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        const theme = sec.getAttribute("data-header-theme");
        setIsLight(theme !== "dark");
        break;
      }
    }
  };

  // Run on route change (CRITICAL FIX)
  useEffect(() => {
    setTimeout(() => {
      checkVisibleSection();
    }, 50); // slight delay ensures page layout is ready
  }, [pathname]);

  // Setup scroll observer
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[data-header-theme]")
    );

    if (!sections.length) return;

    // Immediately check on mount
    checkVisibleSection();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-header-theme");
            setIsLight(theme !== "dark");
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Conditionally add login if user is not logged in
  if (!session) {
    navLinks.push({ label: "Login / Sign up", href: "/login" });
  }

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-white/20 backdrop-blur-2xl border border-white/20 shadow-lg rounded-4xl px-10 py-4 flex items-center space-x-10 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <Image src={Logo} alt="INOVEC" width={120} height={150} className="rounded-md" />
          <span
            className={`font-display text-2xl font-bold drop-shadow-md ${
              isLight ? "text-gray-900" : "text-white"
            }`}
          >
            NAK
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition font-medium ${
                isLight
                  ? "text-gray-900 hover:text-yellow-500"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
  <Link
    href="/cart"
    className={`transition font-medium flex items-center gap-2 ${
      isLight
        ? "text-gray-900 hover:text-yellow-500"
        : "text-white hover:text-yellow-300"
    }`}
  >
    <ShoppingCart size={20} />
  </Link>

          {session && (
  <div className="flex flex-row gap-6 items-center">
    <Link
      className={`transition font-medium flex items-center gap-2 ${
        isLight
          ? "text-gray-900 hover:text-yellow-500"
          : "text-white hover:text-yellow-300"
      }`}
      href={"/"}
    >
      <User size={18} />
      {session.user?.name}
    </Link>

    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`transition font-medium px-4 py-2 rounded-xl ${
        isLight
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-red-700/40 text-red-200 hover:bg-red-700/60"
      }`}
    >
      Sign out
    </button>
  </div>
)}

        </div>
      </nav>
    </header>
  );
};

export default Header;
