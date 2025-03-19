import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 border-2 border-[#F1DCA7]">
            <h1 className="text-3xl font-bold text-[#797D62] mb-6 text-center">Create Account</h1>
            
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#797D62] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#797D62] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#797D62] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#797D62] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#797D62] mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                  required
                />
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#D08C60] border-[#D9AE94] rounded focus:ring-[#D08C60]"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#797D62]">
                  I agree to the <a href="#" className="text-[#D08C60] hover:text-[#C17A50]">terms and conditions</a>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Create Account
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#797D62]">
                Already have an account?{' '}
                <a href="/login" className="text-[#D08C60] hover:text-[#C17A50] font-medium">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 