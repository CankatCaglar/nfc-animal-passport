import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 border-2 border-[#F1DCA7]">
            <h1 className="text-3xl font-bold text-[#797D62] mb-6 text-center">Login</h1>
            
            <form>
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
              
              <div className="mb-6">
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
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#D08C60] border-[#D9AE94] rounded focus:ring-[#D08C60]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#797D62]">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-[#D08C60] hover:text-[#C17A50]">
                  Forgot your password?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#797D62]">
                Don&apos;t have an account?{' '}
                <a href="/signup" className="text-[#D08C60] hover:text-[#C17A50] font-medium">
                  Sign up
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