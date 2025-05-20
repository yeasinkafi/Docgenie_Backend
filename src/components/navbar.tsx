"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-white to-blue-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/home" className="flex items-center group">
            <span className="text-blue-600 text-2xl font-bold tracking-tight group-hover:text-blue-700 transition-colors duration-200">
              Doc-Genie
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  href="/home"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/home")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/doctors")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/about")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className={`font-medium text-sm transition-colors duration-200 py-2 ${
                    isActive("/contact")
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 px-4 py-2"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md active:transform active:scale-95"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } mt-4 pb-4`}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/home"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/home")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/doctors")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Find Doctors
            </Link>
            <Link
              href="/about"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/about")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium text-sm transition-colors duration-200 py-2 ${
                isActive("/contact")
                  ? "text-blue-600 border-l-4 border-blue-600 pl-3"
                  : "text-gray-700 hover:text-blue-600 pl-4"
              }`}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm text-center transition-colors duration-200 py-2"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium text-center transition-all duration-200 hover:shadow-md active:transform active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
