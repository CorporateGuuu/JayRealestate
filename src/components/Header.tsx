'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Phone, User, Building, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'About', href: '/about', icon: User },
    { name: 'Services', href: '/services', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>JAY</span>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Real Estate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:opacity-80 transition-colors duration-200 font-medium"
                style={{ '--hover-color': 'var(--primary)' } as React.CSSProperties}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            style={{ '--hover-color': 'var(--primary)' } as React.CSSProperties}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
