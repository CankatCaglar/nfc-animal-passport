import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
// import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
}
