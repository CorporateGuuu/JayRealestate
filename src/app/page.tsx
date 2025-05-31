import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <Hero />
      <Stats />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
