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
  Shield,
  Mail,
  Phone,
  Linkedin,
  Instagram
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

  const teamMembers = [
    {
      id: 1,
      name: 'John Anderson',
      title: 'CEO & Founder',
      bio: 'With over 8 years of experience in Dubai real estate, John founded JAY Real Estate with a vision to revolutionize property services in the UAE. His deep understanding of Dubai\'s market dynamics and commitment to client satisfaction has positioned JAY Real Estate as a trusted leader in the industry.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'john@jayrealestate.ae',
      phone: '+971 55 208 9241',
      linkedin: '#',
      instagram: '#',
      specializations: ['Luxury Properties', 'Investment Consulting', 'Market Analysis']
    },
    {
      id: 2,
      name: 'Sarah Al-Mansouri',
      title: 'Head Realtor',
      bio: 'Sarah brings 6+ years of specialized expertise in Dubai\'s premium residential and commercial markets. Fluent in Arabic and English, she excels in connecting international clients with their dream properties across Dubai Marina, Downtown Dubai, and Palm Jumeirah.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'sarah@jayrealestate.ae',
      phone: '+971 55 208 9241',
      linkedin: '#',
      instagram: '#',
      specializations: ['Residential Sales', 'Commercial Leasing', 'Client Relations']
    }
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

      {/* Team Section */}
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
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The experienced professionals driving JAY Real Estate's success in Dubai's dynamic market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full rounded-full"
                      priority={index < 2}
                      onError={() => {
                        console.log(`Failed to load image for ${member.name}`);
                      }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 mb-4">
                    {member.title}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">
                    SPECIALIZATIONS
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specializations.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{member.phone}</span>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    <a
                      href={member.instagram}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                      aria-label={`${member.name} Instagram`}
                    >
                      <Instagram className="w-5 h-5 text-blue-600" />
                    </a>
                  </div>
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
