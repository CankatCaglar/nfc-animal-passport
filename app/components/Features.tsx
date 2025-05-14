import Button from './Button';
import Card from './Card';

const features = [
  {
    title: 'Digital Health Records',
    description: 'Store vaccination records, medications, allergies, and medical history securely in one place.',
    icon: '💉'
  },
  {
    title: 'Accessible Data Anywhere',
    description: `Access your animal's digital passport securely from both web and mobile devices, anytime and anywhere.`,
    icon: '🌐'
  },
  {
    title: 'Emergency Contacts',
    description: 'Store important contact information for veterinarians, pet sitters, and emergency services.',
    icon: '📞'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-[#D9AE94] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Key Features
          </h2>
          <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
            Our NFC Animal Passport provides a comprehensive solution for managing your pet&apos;s information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className="h-full transform transition-all hover:scale-105 hover:shadow-lg"
              bgColor="bg-white"
              iconBgColor="bg-[#D08C60]"
              titleColor="text-[#8B5A2B]"
              textColor="text-[#997B66]"
              borderColor="border-[#D9AE94]"
            />
          ))}
        </div>
        
        {/* <div className="mt-16 text-center">
          <Button 
            variant="primary" 
            size="lg" 
            href="/register"
            primaryBgColor="bg-[#D08C60]"
            primaryHoverBgColor="hover:bg-[#C17A50]"
            className="font-bold"
          >
            Get Started Now
          </Button>
        </div> */}
      </div>
    </section>
  );
} 