import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Have questions about NFC Animal Passport? We&apos;re here to help. Get in touch with our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          
          {/* Combined Contact and Office Info Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Get In Touch Form */}
              <div className="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:shadow-lg border-2 border-[#F1DCA7]">
                <h2 className="text-3xl font-bold text-[#8B5A2B] mb-6">
                  Get In Touch
                </h2>
                <p className="text-[#997B66] mb-8">
                  Have questions about NFC Animal Passport? We&apos;re here to help. Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-[#797D62] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[#797D62] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-[#797D62] mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
        </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-[#797D62] mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#D08C60] hover:bg-[#C17A50] text-white font-bold rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Visit Our Office */}
              <div className="bg-white rounded-lg shadow-md border border-[#D9AE94] p-8">
                <h2 className="text-2xl font-bold text-[#8B5A2B] mb-4">Visit Our Office</h2>
                <p className="text-[#997B66] mb-6">
                  We&apos;re located in Bostanli, Izmir. Feel free to stop by during business hours!
              </p>
              
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-6">
                {/* Map would go here */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Map Placeholder</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-[#8B5A2B] mb-2">Address</h3>
                    <p className="text-[#997B66]">
                      Bostanli<br />
                      Izmir<br />
                      Turkey
                  </p>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold text-[#8B5A2B] mb-2">Business Hours</h3>
                    <p className="text-[#997B66]">
                    Monday - Friday: 9am - 5pm<br />
                    Saturday: 10am - 2pm<br />
                    Sunday: Closed
                  </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#F1DCA7] flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                      <svg className="w-5 h-5 text-[#997B66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B5A2B]">Email</h3>
                      <p className="text-[#997B66]">cankatacarer@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#F1DCA7] flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                      <svg className="w-5 h-5 text-[#997B66]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B5A2B]">Phone</h3>
                      <p className="text-[#997B66]">+90 (553) 501 52 65</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 