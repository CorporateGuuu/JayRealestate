'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Home, Award } from 'lucide-react';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: Home,
      number: 500,
      suffix: '+',
      label: 'Properties Sold',
      description: 'Successfully closed deals',
    },
    {
      icon: Users,
      number: 1000,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied customers',
    },
    {
      icon: TrendingUp,
      number: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'In real estate market',
    },
    {
      icon: Award,
      number: 50,
      suffix: '+',
      label: 'Expert Agents',
      description: 'Professional team members',
    },
  ];

  const CountUpAnimation = ({ number, suffix }: { number: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        const timer = setInterval(() => {
          setCount((prevCount) => {
            const increment = Math.ceil(number / 100);
            if (prevCount + increment >= number) {
              clearInterval(timer);
              return number;
            }
            return prevCount + increment;
          });
        }, 20);

        return () => clearInterval(timer);
      }
    }, [isInView, number]);

    return (
      <span className="text-4xl md:text-5xl font-bold text-blue-600">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Years of dedication and expertise have built our reputation as a trusted real estate partner
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <div className="mb-2">
                <CountUpAnimation number={stat.number} suffix={stat.suffix} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose JAY Real Estate?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We combine years of market expertise with cutting-edge technology to deliver exceptional results for our clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Market Expertise</h4>
                  <p className="text-gray-600 text-sm">Deep knowledge of local market trends and pricing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Personalized Service</h4>
                  <p className="text-gray-600 text-sm">Tailored solutions for every client's unique needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Technology Driven</h4>
                  <p className="text-gray-600 text-sm">Modern tools and platforms for seamless transactions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
