'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Award, 
  Users, 
  Target, 
  Heart,
  CheckCircle,
  Star,
  TrendingUp,
  Shield
} from 'lucide-react';

const AboutPage = () => {

  const values = [
    {
      icon: Heart,
      title: 'Client-Centered',
      description: 'Your needs and dreams are at the heart of everything we do. We listen, understand, and deliver.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards, ensuring transparency in every transaction.',
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from initial consultation to closing.',
    },
    {
      icon: Users,
      title: 'Teamwork',
      description: 'Our collaborative approach ensures you benefit from our collective expertise and experience.',
    },
  ];

  const achievements = [
    { number: '300+', label: 'Properties Sold', icon: Award },
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '5+', label: 'Years in Dubai', icon: Star },
    { number: '98%', label: 'Client Satisfaction', icon: CheckCircle },
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
              About JAY Real Estate
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              For over 5 years, we've been helping families and investors find their perfect properties in Dubai.
              Our commitment to excellence and deep local knowledge has made us a trusted name in Dubai real estate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  JAY Real Estate was founded in 2019 with a simple mission: to make the Dubai real estate
                  process as smooth and stress-free as possible for our clients. What started as a
                  specialized Dubai property consultancy has grown into one of the most trusted real estate
                  agencies in the Emirates.
                </p>
                <p>
                  Our founder, John Anderson, recognized that buying or selling property in Dubai requires
                  deep local knowledge and cultural understanding. He built JAY Real Estate on the principles of
                  integrity, Dubai market expertise, and genuine care for our clients' unique needs.
                </p>
                <p>
                  Today, we continue to uphold these values while leveraging cutting-edge technology and
                  Dubai-specific marketing strategies to serve our clients in this dynamic market.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="JAY Real Estate Office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-blue-100">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                "To provide exceptional real estate services that exceed our clients' expectations, 
                while building lasting relationships based on trust, integrity, and results."
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that every client deserves personalized attention and expert guidance 
                throughout their real estate journey. Whether you're buying your first home, 
                selling a property, or building an investment portfolio, we're here to make 
                your real estate dreams a reality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
