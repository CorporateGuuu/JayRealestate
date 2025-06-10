'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Let our expert team guide you through every step of your real estate journey. 
              From finding the perfect property to closing the deal, we're here to help.
            </p>

            {/* CTA Buttons */}
            <div className="btn-group justify-center mb-12">
              <Link
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/properties"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Browse Properties
              </Link>
            </div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {/* Phone */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Speak with our experts
                </p>
                <a
                  href="tel:+971552089241"
                  className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200"
                >
                  +971 55 208 9241
                </a>
              </div>

              {/* Email */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Get detailed information
                </p>
                <a
                  href="mailto:info@jayrealestate.ae"
                  className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200"
                >
                  info@jayrealestate.ae
                </a>
              </div>

              {/* Chat */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Instant support available
                </p>
                <button className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200">
                  Start Chat
                </button>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-300">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      15+ Years of Experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      500+ Properties Sold
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      98% Client Satisfaction
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-300">
                    Our Promise
                  </h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      Transparent Process
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      Expert Guidance
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                      Best Market Prices
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
    </section>
  );
};

export default CTA;
