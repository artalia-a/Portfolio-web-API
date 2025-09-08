"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/about", label: "About" },
    { href: "/project", label: "Project" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-30 py-4 z-50 backdrop-blur bg-[rgba(255,255,255,0.5)]">
      {/* Logo */}
      <div className="text-3xl font-bold text-[#806D9C]">A</div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-gray-800 hover:text-[#806D9C] ${
                isActive ? "text-[#806D9C] font-semibold" : ""
              }`}
            >
              {link.label}
              {/* Garis ungu bawah jika aktif */}
              {isActive && (
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#806D9C] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
