'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  Key, 
  Calculator, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Buy Property',
      description: 'Find your dream home with our extensive property listings and expert guidance throughout the buying process.',
      features: ['Property Search', 'Market Analysis', 'Negotiation Support', 'Closing Assistance'],
      color: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      title: 'Sell Property',
      description: 'Maximize your property value with our proven marketing strategies and professional selling expertise.',
      features: ['Property Valuation', 'Marketing Strategy', 'Professional Photography', 'Buyer Screening'],
      color: 'bg-green-500',
    },
    {
      icon: Key,
      title: 'Rent Property',
      description: 'Whether you\'re looking to rent or lease out your property, we provide comprehensive rental services.',
      features: ['Tenant Screening', 'Lease Management', 'Property Maintenance', 'Rent Collection'],
      color: 'bg-purple-500',
    },
    {
      icon: Calculator,
      title: 'Property Valuation',
      description: 'Get accurate property valuations based on current market conditions and comparable sales data.',
      features: ['Market Analysis', 'Comparative Studies', 'Investment Potential', 'Detailed Reports'],
      color: 'bg-orange-500',
    },
    {
      icon: Shield,
      title: 'Legal Support',
      description: 'Navigate complex real estate transactions with confidence through our legal support services.',
      features: ['Contract Review', 'Title Search', 'Legal Documentation', 'Compliance Check'],
      color: 'bg-red-500',
    },
    {
      icon: Users,
      title: 'Investment Consulting',
      description: 'Make informed investment decisions with our expert analysis and market insights.',
      features: ['ROI Analysis', 'Market Trends', 'Portfolio Planning', 'Risk Assessment'],
      color: 'bg-indigo-500',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to meet all your property needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/services"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group-hover:translate-x-1 transform transition-transform"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and efficient - that's how we work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We understand your needs and preferences' },
              { step: '02', title: 'Search & Analysis', description: 'Find properties that match your criteria' },
              { step: '03', title: 'Negotiation', description: 'Secure the best deal for your investment' },
              { step: '04', title: 'Closing', description: 'Complete the transaction smoothly' },
            ].map((process, index) => (
              <div key={process.step} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 z-0"></div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {process.title}
                  </h4>
                  <p className="text-gray-600">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Let our experts help you with your real estate journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Contact Us Today
              </Link>
              <Link href="/properties" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Browse Properties
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
