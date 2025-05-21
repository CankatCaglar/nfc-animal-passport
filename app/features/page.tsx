import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

const features = [
  {
    title: 'Digital Health Records',
    description: 'Store vaccination records, medications, allergies, and medical history securely in one place. Easily share this information with veterinarians or pet sitters when needed.',
    icon: '💉'
  },
  {
    title: 'Accessible Data Anywhere',
    description: `Access your animal's digital passport securely from both web and mobile devices, anytime and anywhere.`,
    icon: '🌐'
  },
  {
    title: 'Emergency Contacts',
    description: 'Store important contact information for veterinarians, pet sitters, and emergency services. Ensure your pet receives proper care even when you\'re not available.',
    icon: '📞'
  }
];

export default function Features() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Features & Benefits
            </h1>
            <p className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto">
              Our NFC Animal Passport provides a comprehensive solution for managing your pet's information. Explore all the features that make it the perfect tool for responsible pet owners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="h-full min-w-[180px] max-w-[320px] mx-auto"
                bgColor="bg-white"
                iconBgColor="bg-[#D08C60]"
                titleColor="text-[#8B5A2B]"
                textColor="text-[#997B66]"
                borderColor="border-[#D9AE94]"
                hoverEffect
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 