import Link from 'next/link';
import { Home, Search, ArrowLeft, Phone, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4">
            404
          </div>
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          <Link
            href="/properties"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-flex items-center justify-center"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Properties
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/properties"
              className="text-left p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Properties
              </h3>
              <p className="text-sm text-gray-600">
                Browse our off-plan developments
              </p>
            </Link>
            <Link
              href="/about"
              className="text-left p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                About Us
              </h3>
              <p className="text-sm text-gray-600">
                Learn about JAY Real Estate
              </p>
            </Link>
            <Link
              href="/services"
              className="text-left p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Services
              </h3>
              <p className="text-sm text-gray-600">
                Our real estate services
              </p>
            </Link>
            <Link
              href="/contact"
              className="text-left p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Contact
              </h3>
              <p className="text-sm text-gray-600">
                Get in touch with us
              </p>
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need help? Contact our team directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+971552089241"
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-2" />
              +971 55 208 9241
            </a>
            <a
              href="mailto:info@jayrealestate.ae"
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <Mail className="w-4 h-4 mr-2" />
              info@jayrealestate.ae
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
