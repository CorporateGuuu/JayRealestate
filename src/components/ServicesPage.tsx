'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home,
  TrendingUp,
  Key,
  Calculator,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  DollarSign,
  Camera,
  Search,
  Handshake
} from 'lucide-react';

const ServicesPage = () => {
  const mainServices = [
    {
      id: 'buy',
      icon: Home,
      title: 'Buy Property',
      description: 'Find your dream home with our extensive property listings and expert guidance throughout the buying process.',
      features: [
        'Personalized property search',
        'Market analysis and pricing guidance',
        'Negotiation support',
        'Closing assistance and coordination',
        'Post-purchase support'
      ],
      process: [
        'Initial consultation to understand your needs',
        'Property search and viewing coordination',
        'Market analysis and price evaluation',
        'Offer preparation and negotiation',
        'Closing coordination and support'
      ],
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'sell',
      icon: TrendingUp,
      title: 'Sell Property',
      description: 'Maximize your property value with our proven marketing strategies and professional selling expertise.',
      features: [
        'Comprehensive market analysis',
        'Professional photography and staging',
        'Multi-channel marketing strategy',
        'Qualified buyer screening',
        'Expert negotiation'
      ],
      process: [
        'Property evaluation and pricing strategy',
        'Professional staging and photography',
        'Marketing campaign launch',
        'Buyer screening and showings',
        'Negotiation and closing support'
      ],
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'rent',
      icon: Key,
      title: 'Rent Property',
      description: 'Whether you\'re looking to rent or lease out your property, we provide comprehensive rental services.',
      features: [
        'Tenant screening and Emirates ID verification',
        'RERA-compliant lease agreement preparation',
        'DEWA and property maintenance coordination',
        'Rent collection and management',
        'Dubai Municipality compliance support'
      ],
      process: [
        'Property assessment and pricing',
        'Marketing and tenant screening',
        'Lease negotiation and signing',
        'Move-in coordination',
        'Ongoing property management'
      ],
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'management',
      icon: Calculator,
      title: 'Property Management',
      description: 'Full-service property management to maximize your investment returns while minimizing your involvement.',
      features: [
        'Tenant acquisition and screening',
        'Rent collection and accounting',
        'Maintenance and repairs coordination',
        'Regular property inspections',
        'Financial reporting'
      ],
      process: [
        'Property assessment and setup',
        'Marketing and tenant placement',
        'Lease management and renewals',
        'Maintenance coordination',
        'Financial reporting and analysis'
      ],
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'consulting',
      icon: Users,
      title: 'Investment Consulting',
      description: 'Make informed investment decisions with our expert analysis and market insights.',
      features: [
        'ROI analysis and projections',
        'Market trend analysis',
        'Portfolio diversification strategies',
        'Risk assessment and mitigation',
        'Exit strategy planning'
      ],
      process: [
        'Investment goals assessment',
        'Market research and analysis',
        'Property evaluation and selection',
        'Investment strategy development',
        'Ongoing portfolio monitoring'
      ],
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'valuation',
      icon: Shield,
      title: 'Property Valuation',
      description: 'Get accurate property valuations based on current market conditions and comparable sales data.',
      features: [
        'Comprehensive market analysis',
        'Comparative property studies',
        'Investment potential assessment',
        'Detailed valuation reports',
        'Expert consultation'
      ],
      process: [
        'Property inspection and assessment',
        'Market data collection and analysis',
        'Comparable sales research',
        'Valuation calculation and review',
        'Detailed report preparation'
      ],
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  const additionalServices = [
    {
      icon: Camera,
      title: 'Professional Photography',
      description: 'High-quality property photography to showcase your home in the best light.',
    },
    {
      icon: Search,
      title: 'Market Research',
      description: 'In-depth market analysis and research for informed decision making.',
    },
    {
      icon: Handshake,
      title: 'Negotiation Services',
      description: 'Expert negotiation to ensure you get the best possible deal.',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Comprehensive Dubai real estate solutions tailored to meet all your property needs.
              From buying and selling to UAE investment consulting, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`${service.bgColor} rounded-3xl p-8 md:p-12`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What's Included:
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="btn-primary inline-flex items-center"
                    >
                      Contact Us
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>

                  {/* Process */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Our Process
                      </h3>
                      <div className="space-y-4">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-gray-700 pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complementary services to support your real estate journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JAY Real Estate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference of working with true real estate professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Dubai Market Expertise',
                description: '300+ successful Dubai transactions and 98% client satisfaction rate demonstrate our local market commitment.',
              },
              {
                icon: Users,
                title: 'Local Expert Team',
                description: 'Our Dubai-based agents bring deep local market knowledge and personalized service to every transaction.',
              },
              {
                icon: DollarSign,
                title: 'UAE Investment Value',
                description: 'Competitive rates with Dubai market expertise ensure you get the best value for your UAE investment.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Contact Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your Dubai real estate needs and discover how we can help you achieve your UAE property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Contact Us Today
              </Link>
              <Link href="/properties" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Browse Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
