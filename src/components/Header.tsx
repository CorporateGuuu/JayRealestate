'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);

  const navigation = [
    {
      name: 'Buy',
      href: '/properties?type=buy',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Apartments', href: '/properties?type=buy&category=apartment' },
        { name: 'Villas', href: '/properties?type=buy&category=villa' },
        { name: 'Townhouses', href: '/properties?type=buy&category=townhouse' },
        { name: 'Penthouses', href: '/properties?type=buy&category=penthouse' },
      ]
    },
    {
      name: 'Rent',
      href: '/properties?type=rent',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Apartments', href: '/properties?type=rent&category=apartment' },
        { name: 'Villas', href: '/properties?type=rent&category=villa' },
        { name: 'Townhouses', href: '/properties?type=rent&category=townhouse' },
        { name: 'Commercial', href: '/properties?type=rent&category=commercial' },
      ]
    },
    { name: 'Off Plan', href: '/properties?type=off-plan' },
    { name: 'About us', href: '/about' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container-custom px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo
              width={80}
              height={50}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 xl:space-x-12 flex-grow justify-center">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors duration-200 font-medium px-2 py-1"
                      onMouseEnter={() => {
                        if (item.name === 'Buy') setBuyDropdownOpen(true);
                        if (item.name === 'Rent') setRentDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (item.name === 'Buy') setBuyDropdownOpen(false);
                        if (item.name === 'Rent') setRentDropdownOpen(false);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {((item.name === 'Buy' && buyDropdownOpen) || (item.name === 'Rent' && rentDropdownOpen)) && (
                      <div
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                        onMouseEnter={() => {
                          if (item.name === 'Buy') setBuyDropdownOpen(true);
                          if (item.name === 'Rent') setRentDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'Buy') setBuyDropdownOpen(false);
                          if (item.name === 'Rent') setRentDropdownOpen(false);
                        }}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:text-gray-200 transition-colors duration-200 font-medium px-2 py-1"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0 ml-4 xl:ml-8">
            <Link
              href="/contact"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap"
            >
              Book a evaluation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200 flex-shrink-0 ml-2"
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
            <div className="container-custom py-6 px-4">
              <nav className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 py-1"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 w-full text-center block"
                  >
                    Book a evaluation
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
