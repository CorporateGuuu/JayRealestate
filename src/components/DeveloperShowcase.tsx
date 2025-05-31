'use client';

import { motion } from 'framer-motion';
import { Building, Star, Award, Users } from 'lucide-react';

const DeveloperShowcase = () => {
  const developers = [
    {
      id: 1,
      name: 'Emaar Properties',
      description: 'Leading real estate developer in Dubai',
      projects: ['Dubai Creek Harbour', 'Downtown Dubai', 'Dubai Hills Estate'],
      established: '1997',
      icon: Building,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      name: 'DAMAC Properties',
      description: 'Luxury real estate developer',
      projects: ['DAMAC Hills', 'Business Bay', 'DAMAC Lagoons'],
      established: '2002',
      icon: Star,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 3,
      name: 'Sobha Realty',
      description: 'Premium residential developer',
      projects: ['Sobha Hartland', 'MBR City', 'Sobha One'],
      established: '1995',
      icon: Award,
      color: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      name: 'Nakheel',
      description: 'Master developer of iconic projects',
      projects: ['Palm Jumeirah', 'Dubai Islands', 'The World'],
      established: '2000',
      icon: Users,
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 5,
      name: 'Dubai Properties',
      description: 'Government-backed developer',
      projects: ['Jumeirah Beach Residence', 'Business Bay', 'Marsa Al Arab'],
      established: '2004',
      icon: Building,
      color: 'from-red-600 to-red-800'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted Developer Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work exclusively with Dubai's most reputable developers to bring you 
            premium off-plan properties with guaranteed quality and timely delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover group"
            >
              {/* Developer Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${developer.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <developer.icon className="w-8 h-8 text-white" />
              </div>

              {/* Developer Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {developer.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3">
                {developer.description}
              </p>

              <div className="text-xs text-gray-500 mb-4">
                Est. {developer.established}
              </div>

              {/* Key Projects */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-gray-700 mb-2">Key Projects:</div>
                {developer.projects.slice(0, 2).map((project, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {project}
                  </div>
                ))}
                {developer.projects.length > 2 && (
                  <div className="text-xs text-blue-600 font-medium">
                    +{developer.projects.length - 2} more projects
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interested in off-plan properties from these developers?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/properties" className="btn-primary">
              View All Properties
            </a>
            <a href="/contact" className="btn-secondary">
              Speak with Expert
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperShowcase;
