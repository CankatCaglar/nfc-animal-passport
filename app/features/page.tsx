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
    title: 'Instant Identification',
    description: 'Quick access to your pet&apos;s identification details, helping reunite lost pets with their owners faster. Includes name, breed, age, and owner contact information.',
    icon: '🔍'
  },
  {
    title: 'Emergency Contacts',
    description: 'Store important contact information for veterinarians, pet sitters, and emergency services. Ensure your pet receives proper care even when you&apos;re not available.',
    icon: '📞'
  },
  {
    title: 'Dietary Information',
    description: 'Keep track of your pet&apos;s dietary needs, restrictions, and feeding schedules. Particularly important for pets with special dietary requirements or allergies.',
    icon: '🍖'
  },
  {
    title: 'Travel Documentation',
    description: 'Store travel certificates and documentation required for crossing borders with your pet. Makes international travel with your pet much more convenient.',
    icon: '✈️'
  },
  {
    title: 'Behavior Notes',
    description: 'Document your pet&apos;s behavior patterns, training progress, and special needs. Helpful for pet sitters, trainers, and anyone caring for your pet.',
    icon: '📝'
  },
  {
    title: 'Medication Reminders',
    description: 'Set up reminders for medications, treatments, and veterinary appointments. Never miss an important medication or check-up again.',
    icon: '⏰'
  },
  {
    title: 'Photo Gallery',
    description: 'Store photos of your pet for identification purposes and to track physical changes over time. Also great for sharing precious memories with friends and family.',
    icon: '📸'
  }
];

export default function Features() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Features & Benefits
            </h1>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Our NFC Animal Passport provides a comprehensive solution for managing your pet&apos;s information. Explore all the features that make it the perfect tool for responsible pet owners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="h-full"
                bgColor="bg-white"
                iconBgColor="bg-[#D08C60]"
                titleColor="text-[#8B5A2B]"
                textColor="text-[#997B66]"
                borderColor="border-[#D9AE94]"
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
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
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 