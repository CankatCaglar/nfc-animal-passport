import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#997B66] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#F1DCA7] text-center md:text-left">NFC Animal Passport</h3>
            <p className="text-sm text-white opacity-80 text-center md:text-left">
              Secure digital passports for your livestock using NFC technology.
              Track health records, identification, and more in one place.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#F1DCA7] text-center md:text-left">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href="/" className="text-sm text-white opacity-80 hover:text-[#F1DCA7] hover:opacity-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-white opacity-80 hover:text-[#F1DCA7] hover:opacity-100 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white opacity-80 hover:text-[#F1DCA7] hover:opacity-100 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-white opacity-80 hover:text-[#F1DCA7] hover:opacity-100 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center">
          <p className="text-sm text-white opacity-80">
            &copy; {new Date().getFullYear()} NFC Animal Passport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 