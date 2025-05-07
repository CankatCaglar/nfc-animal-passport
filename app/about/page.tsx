import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              About NFC Animal Passport
            </h1>
            
            <div className="bg-[#F9F3EE] rounded-lg shadow-md border border-[#D9AE94] p-8 md:p-12 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B5A2B] mb-6">Our Mission</h2>
              <p className="text-[#997B66] mb-6 text-lg">
                At NFC Animal Passport, our mission is to revolutionize pet identification and health record management using modern technology. We believe that every pet deserves the best care possible, and that starts with accessible, secure, and comprehensive information.
              </p>
              <p className="text-[#997B66] mb-6 text-lg">
                We created the NFC Animal Passport system to bridge the gap between traditional pet identification methods and the digital age, providing pet owners, veterinarians, and emergency responders with instant access to critical information when it matters most.
              </p>
              
              <div className="w-full h-1 bg-[#D9AE94] my-8"></div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B5A2B] mb-6">Our Story</h2>
              <p className="text-[#997B66] mb-6 text-lg">
                The idea for NFC Animal Passport was born when our founder lost their beloved dog during a family vacation. Despite having a microchip, there were delays in accessing the information, causing unnecessary stress and worry.
              </p>
              <p className="text-[#997B66] mb-6 text-lg">
                This experience highlighted the need for a more accessible and immediate solution. By leveraging NFC technology, we&apos;ve created a system that allows anyone with a smartphone to instantly access a pet&apos;s essential information, helping to reunite lost pets with their owners faster and ensure proper care in emergency situations.
              </p>
              
              <div className="w-full h-1 bg-[#D9AE94] my-8"></div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#8B5A2B] mb-6">Our Team</h2>
              <p className="text-[#997B66] mb-6 text-lg">
                Our team consists of passionate pet owners, veterinary professionals, and technology experts who are dedicated to improving the lives of pets and their owners through innovative solutions.
              </p>
              <p className="text-[#997B66] text-lg">
                We work closely with veterinarians, animal shelters, and pet organizations to ensure that our product meets the real-world needs of the pet community.
              </p>
            </div>
            
            <div className="text-center">
              <Button 
                variant="primary" 
                size="lg" 
                href="/contact"
                primaryBgColor="bg-[#D08C60]"
                primaryHoverBgColor="hover:bg-[#C17A50]"
                className="font-bold"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 