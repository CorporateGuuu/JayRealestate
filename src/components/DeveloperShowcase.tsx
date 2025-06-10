'use client';

import { motion } from 'framer-motion';
import { Building, Star, Award } from 'lucide-react';
import {
  staggerContainer,
  staggerItem,
  staggerItemFast,
  easings
} from '@/lib/animations';

const DeveloperShowcase = () => {
  const developers = [
    {
      id: 1,
      name: 'EMAAR PROPERTIES',
      logo: 'EMAAR',
      description: 'Dubai\'s leading developer behind iconic projects like Burj Khalifa and Dubai Mall',
      projects: ['Downtown Dubai', 'Dubai Creek Harbour', 'Dubai Hills Estate'],
      established: '1997',
      rating: 4.8
    },
    {
      id: 2,
      name: 'DAMAC PROPERTIES',
      logo: 'DAMAC',
      description: 'Luxury real estate developer known for premium residential and commercial projects',
      projects: ['DAMAC Hills', 'Business Bay', 'Dubai Marina'],
      established: '2002',
      rating: 4.6
    },
    {
      id: 3,
      name: 'SOBHA REALTY',
      logo: 'SOBHA',
      description: 'Premium developer specializing in luxury residential communities',
      projects: ['Sobha Hartland', 'Mohammed Bin Rashid City', 'Dubai Creek Harbour'],
      established: '2014',
      rating: 4.7
    },
    {
      id: 4,
      name: 'NAKHEEL',
      logo: 'NAKHEEL',
      description: 'Master developer of iconic destinations including Palm Jumeirah',
      projects: ['Palm Jumeirah', 'The World Islands', 'Dragon City'],
      established: '2000',
      rating: 4.5
    },
    {
      id: 5,
      name: 'DUBAI PROPERTIES',
      logo: 'DP',
      description: 'Government-backed developer creating integrated communities',
      projects: ['Business Bay', 'Jumeirah Beach Residence', 'Dubai Wharf'],
      established: '2004',
      rating: 4.4
    }
  ];

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Premier Dubai Developers
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Partner with Dubai's most trusted real estate developers, creating iconic communities and luxury developments across the emirate
          </motion.p>
        </motion.div>

        {/* Enhanced Developer Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              variants={staggerItemFast}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group animate-optimized"
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.15)' }}
              transition={{ duration: 0.3, ease: easings.natural }}
            >
              <div className="content-padding">
                {/* Developer Logo/Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl md:text-3xl font-bold text-jay-primary">
                    {developer.logo}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{developer.rating}</span>
                  </div>
                </div>

                {/* Developer Info */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-jay-primary transition-colors duration-200">
                  {developer.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {developer.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    <span>Est. {developer.established}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{developer.projects.length} Projects</span>
                  </div>
                </div>

                {/* Key Projects */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">Key Projects:</h4>
                  <div className="flex flex-wrap gap-1">
                    {developer.projects.slice(0, 3).map((project, idx) => (
                      <span
                        key={idx}
                        className="bg-jay-primary/10 text-jay-primary px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default DeveloperShowcase;
