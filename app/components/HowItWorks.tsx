import Button from './Button';

const steps = [
  {
    number: '01',
    title: 'Register Your Pet',
    description: 'Create an account and register your pet with basic information like name, breed, age, and photo.'
  },
  {
    number: '02',
    title: 'Add Detailed Information',
    description: 'Enter health records, identification details, emergency contacts, and other important information.'
  },
  {
    number: '03',
    title: 'Receive Your NFC Tag',
    description: 'We&apos;ll send you a durable, waterproof NFC tag that can be attached to your pet&apos;s collar.'
  },
  {
    number: '04',
    title: 'Scan & Access Information',
    description: 'Anyone with a smartphone can scan the NFC tag to access your pet&apos;s information in emergency situations.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#F1DCA7] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#797D62] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#997B66] max-w-2xl mx-auto">
            Getting started with NFC Animal Passport is simple and straightforward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg shadow-xl p-8 h-full transform transition-all hover:shadow-2xl hover:-translate-y-1 border-2 border-[#F1DCA7]">
                <div className="text-4xl font-bold text-[#D08C60] mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#797D62] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#997B66]">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D08C60]">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
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
  );
} 