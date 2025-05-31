'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Calendar,
  User
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyType: string;
  budget: string;
}

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate form submission
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['Sultan Business Centre, Oud Metha', 'Office Number: 137-A-75', 'Dubai, UAE'],
      action: 'Get Directions',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+971 55 208 9241', 'Sun-Thu: 9AM-6PM GST', 'Sat: 10AM-4PM GST'],
      action: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@jayrealestate.ae', 'dubai@jayrealestate.ae', 'We reply within 24 hours'],
      action: 'Send Email',
    },
  ];

  const officeHours = [
    { day: 'Sunday - Thursday', hours: '9:00 AM - 6:00 PM GST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM GST' },
    { day: 'Friday', hours: 'Closed' },
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Ready to start your Dubai real estate journey? Get in touch with our local expert team today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2 mb-6">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                  {info.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800">
                    Thank you! Your message has been sent successfully.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <select
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="investment">Investment Consulting</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Property Type
                    </label>
                    <select
                      {...register('propertyType')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select property type</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Budget Range
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="0-200k">$0 - $200,000</option>
                      <option value="200k-500k">$200,000 - $500,000</option>
                      <option value="500k-1m">$500,000 - $1,000,000</option>
                      <option value="1m-2m">$1,000,000 - $2,000,000</option>
                      <option value="2m+">$2,000,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your real estate needs..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Office Hours and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Emergency Contact:</strong> For urgent matters outside office hours,
                    call our emergency line at +971 55 208 9241.
                  </p>
                </div>
              </div>

              {/* Schedule Appointment */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <Calendar className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">
                    Schedule a Consultation
                  </h3>
                </div>
                <p className="text-blue-100 mb-6">
                  Prefer to meet in person? Schedule a free consultation with one of our experts.
                </p>
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Book Appointment
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Find Us
                </h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Sultan Business Centre, Oud Metha, Office: 137-A-75, Dubai</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
