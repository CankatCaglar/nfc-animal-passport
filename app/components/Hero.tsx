import Button from './Button';

export default function Hero() {
  return (
    <section className="bg-[#9B9B7A] text-white py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Digital Passports for Your Pets
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-lg">
              Secure, accessible, and convenient NFC-powered digital passports for your beloved animals. Keep all their important information in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                href="/register"
                secondaryTextColor="text-[#8B5A2B]"
                secondaryHoverBgColor="hover:bg-[#F1DCA7]"
                className="font-bold bg-[#F1DCA7]"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                href="/learn-more" 
                outlineBorderColor="border-white" 
                outlineTextColor="text-white" 
                outlineHoverBgColor="hover:bg-[#F1DCA7]" 
                outlineHoverTextColor="hover:text-[#8B5A2B]"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute top-0 left-0 w-full h-full bg-[#F9F3EE] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-xl transform -rotate-3">
                <div className="w-full h-full bg-[#F1DCA7] opacity-10"></div>
              </div>
              <div className="absolute top-4 left-4 w-full h-full bg-[#F9F3EE] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto bg-[#C17A50] rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <span className="text-6xl">🐾</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#8B5A2B] mb-2">NFC Animal Passport</h3>
                    <p className="text-[#997B66]">Scan to access pet information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 