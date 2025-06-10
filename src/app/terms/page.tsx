import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - JAY Real Estate',
  description: 'Terms of Service for JAY Real Estate - Terms and conditions for using our services.',
};

export default function TermsOfService() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using JAY Real Estate's website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
              <p className="text-gray-700 mb-4">
                JAY Real Estate provides real estate services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Property buying and selling assistance</li>
                <li>Property rental and leasing services</li>
                <li>Property management services</li>
                <li>Investment consulting</li>
                <li>Property valuation services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                Users of our services agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Not interfere with the operation of our website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                JAY Real Estate shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-gray-700">
                <li>Email: info@jayrealestate.ae</li>
                <li>Phone: +971 55 208 9241</li>
                <li>Address: Sultan Business Centre, Oud Metha, Office 137-A-75, Dubai, UAE</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
