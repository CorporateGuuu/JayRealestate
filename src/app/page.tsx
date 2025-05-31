import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import DeveloperShowcase from '@/components/DeveloperShowcase';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <Hero />
      <FeaturedProperties />
      <DeveloperShowcase />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
