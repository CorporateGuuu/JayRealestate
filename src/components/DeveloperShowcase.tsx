'use client';

import { motion } from 'framer-motion';

const DeveloperShowcase = () => {
  const developers = [
    {
      id: 1,
      name: 'EMAAR',
      logo: 'EMAAR'
    },
    {
      id: 2,
      name: 'NAKHEEL',
      logo: 'NAKHEEL'
    },
    {
      id: 3,
      name: 'MERAAS',
      logo: 'MERAAS'
    },
    {
      id: 4,
      name: 'SOBHA REALTY',
      logo: 'SOBHA'
    },
    {
      id: 5,
      name: 'BINGHATTI',
      logo: 'BINGHATTI'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
            Best Real Estate Developers
          </h2>
        </motion.div>

        {/* Developer Logos */}
        <div className="flex flex-wrap items-center justify-start gap-8 md:gap-12 lg:gap-16">
          {developers.map((developer, index) => (
            <motion.div
              key={developer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                {developer.logo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase;
