import HeroSection from '../components/hero/hero-section';
import AboutUs from '../components/hero/about-section';
import Contact from '../components/contact';
import Footer from '../layout/footer';
import Layout from '@/layout/layout';
// import '../app/globals.css';
import Contact2 from '@/components/hero/contact2';
import CTA10 from '@/components/hero/cta';
import Navbar1 from '@/components/hero/navbar1';
import Blog6 from '@/components/hero/blog6';
export default function Home() {
  return (
    <>
    <Navbar1></Navbar1>
      <HeroSection />
      <CTA10></CTA10>
      <AboutUs />
      <Blog6/>
      <Contact2></Contact2>
        <Footer/>
    </>
  );
}
