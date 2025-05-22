'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote: "The NFC Animal Passport has been a lifesaver for my adventurous livestock. When she wandered off, someone found her and scanned the tag. They immediately had access to my contact information and were able to return her safely.",
    name: "Sarah Johnson",
    livestock: "Owner of Luna, Domestic Shorthair",
    avatar: "🐱"
  },
  {
    quote: "As a veterinarian, I recommend NFC Animal Passport to all my clients. It makes accessing medical history during emergencies so much easier, especially when livestock are brought in by someone other than their primary owner.",
    name: "Dr. Michael Chen",
    livestock: "Veterinarian",
    avatar: "👨‍⚕️"
  },
  {
    quote: "We travel frequently with our livestock, and having all his vaccination records and travel documents accessible through the NFC tag has made crossing borders much smoother. No more carrying folders of paperwork!",
    name: "James & Emily Wilson",
    livestock: "Owners of Max, Golden Retriever",
    avatar: "🐕"
  },
  {
    quote: "My elderly mother takes care of my livestock when I&apos;m away. Having all the care instructions, dietary needs, and emergency contacts on the NFC tag gives me peace of mind that my livestock will be well taken care of.",
    name: "Olivia Martinez",
    livestock: "Owner of Thumper, Holland Lop",
    avatar: "🐰"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 bg-[#D08C60] text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Our Users Say
          </h2>
          <p className="text-lg text-white opacity-80 max-w-2xl mx-auto">
            Hear from livestock owners who have experienced the benefits of NFC Animal Passport.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 md:p-12 relative shadow-xl border-2 border-[#F1DCA7]">
            <div className="text-5xl text-[#D08C60] absolute top-6 left-6 opacity-30">
              &quot;
            </div>
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl mb-8 italic text-[#797D62]">
                {testimonials[activeIndex].quote}
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#D08C60] flex items-center justify-center mr-4 text-2xl shadow-md text-white">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-[#797D62]">{testimonials[activeIndex].name}</h4>
                  <p className="text-[#997B66] opacity-80">{testimonials[activeIndex].livestock}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#F1DCA7] hover:text-[#D08C60] transition-colors shadow-md text-[#D08C60] border-2 border-[#F1DCA7]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-[#F1DCA7] scale-125' : 'bg-white bg-opacity-50'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#F1DCA7] hover:text-[#D08C60] transition-colors shadow-md text-[#D08C60] border-2 border-[#F1DCA7]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 