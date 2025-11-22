import React from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';

const page = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200">
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">

        {/* Header Section */}
        <header className="w-full py-8 bg-white/70 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-30">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <h1 className="text-4xl font-extrabold text-indigo-600 drop-shadow-sm tracking-wide">
              AI Mock Interview
            </h1>

            <nav className="flex flex-col sm:flex-row items-center mt-4 md:mt-0 space-y-3 sm:space-y-0 sm:space-x-6">
              <a href="#features" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">Features</a>
              <a href="#testimonials" className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition">User Experiences</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24
        bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg">
          <h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">Crack Your Upcoming Interview</h2>
          <p className="mt-6 text-xl md:text-2xl opacity-90">
            Practice with AI-powered mock interviews and get personalized feedback.
          </p>

          <div className="mt-8 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-8 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold
              bg-white text-indigo-700 rounded-xl shadow-xl hover:scale-110 transition-transform"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="px-8 py-3 text-lg font-semibold border border-white rounded-xl 
              hover:bg-white hover:text-purple-700 transition-all"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="mt-4 text-lg text-gray-700">
              Our AI Mock Interview platform offers a range of powerful features:
            </p>

            <div className="flex flex-wrap justify-center mt-12 gap-8">

              {/* Card 1 */}
              <div className="w-full md:w-1/3 px-4">
                <div className="p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl 
                hover:shadow-2xl transition border border-gray-200">
                  <h3 className="text-2xl font-bold text-indigo-700">AI Mock Interviews</h3>
                  <p className="mt-3 text-gray-600">Experience realistic interview simulations with our advanced AI.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-full md:w-1/3 px-4">
                <div className="p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl 
                hover:shadow-2xl transition border border-gray-200">
                  <h3 className="text-2xl font-bold text-indigo-700">Instant Feedback</h3>
                  <p className="mt-3 text-gray-600">Get instant, personalized insights to boost your confidence.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-full md:w-1/3 px-4">
                <div className="p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl 
                hover:shadow-2xl transition border border-gray-200">
                  <h3 className="text-2xl font-bold text-indigo-700">Comprehensive Reports</h3>
                  <p className="mt-3 text-gray-600">Detailed analytics on strengths and areas to improve.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-100 to-gray-300 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>

            <div className="flex flex-wrap justify-center mt-12 gap-8">

              {/* Card 1 */}
              <div className="w-full md:w-1/2 px-4">
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
                  <p className="text-gray-600 italic">
                    "The AI mock interviews boosted my confidence. Amazing experience!"
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-indigo-700">- Alex Johnson</h4>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-full md:w-1/2 px-4">
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
                  <p className="text-gray-600 italic">
                    "Perfect feedback system… improved my interview answers immediately!"
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-indigo-700">- Sarah Williams</h4>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 bg-indigo-800 text-white text-center">
        <p>© 2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page
