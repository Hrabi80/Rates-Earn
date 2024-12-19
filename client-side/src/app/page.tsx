import HeroSection from '../components/hero/hero-section';
import AboutUs from '../components/hero/about-section';
import Contact from '../components/contact';
import Footer from '../layout/footer';
import Layout from '@/layout/layout';
import '../app/globals.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
        <Footer/>
    </>
  );
}
