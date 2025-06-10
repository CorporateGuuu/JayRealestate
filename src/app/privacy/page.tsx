import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - JAY Real Estate',
  description: 'Privacy Policy for JAY Real Estate - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Fill out contact forms on our website</li>
                <li>Request property information or viewings</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via phone, email, or WhatsApp</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you property listings and market updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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
