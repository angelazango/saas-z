'use client';

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login'); // Redirect to login if not logged in
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Main Container with Dark Background */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="flex w-full max-w-6xl items-center gap-12">
          {/* Left Side */}
          <div className="flex-1">
            <div className="max-w-lg">
              <div className="relative mb-8">
                <h2 className="text-7xl md:text-8xl font-black text-transparent
                 bg-clip-text bg-gradient-to-r -mt-9 from-yellow-600 to-orange-600">
                  SAAS-Z
                </h2>
                <h3 className="absolute top-0 left-0 w-full h-full text-7xl md:text-8xl 
                font-black text-purple-500/20 -z-10">
                  SAAS-Z
                </h3>
              </div>

              <p className="text-xl text-white font-bold mb-12 leading-relaxed border-l-4
               border-cyan-400 pl-6 bg-white/5 backdrop-blur-sm rounded-r-lg py-4 hover:bg-white/10 hover:border-cyan-300 transition-all duration-300 hover:translate-x-2 shadow-lg hover:shadow-cyan-400/20">
                Experience the future of SaaS management with our cutting-edge solutions
              </p>
              <p className="text-xl text-white font-bold mb-12 leading-relaxed border-l-4
               border-cyan-400 pl-6 bg-white/5 backdrop-blur-xl rounded-r-lg py-4 hover:bg-white/10 hover:border-cyan-300 transition-all duration-300
                hover:translate-x-2 shadow-lg hover:shadow-cyan-400/20">
                Centralize your business operations effectively with ease and steeze  !
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/home/overview" className="group relative overflow-hidden
                 border-2 border-white bg-gradient-to-r from-transparent via-white/5 to-transparent
                  backdrop-blur-sm hover:from-white/10 hover:via-white/20 hover:to-white/10 text-white 
                  px-8 py-4 rounded-xl text-lg font-bold transition-all duration-500 ease-out text-center 
                  transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                  <span className="relative z-10">Inventory Module</span>
                </Link>
                <Link href="/dashboards/Analytics" className="group relative overflow-hidden border-2 border-white
                 bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm hover:from-white/10 hover:via-white/20 hover:to-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-500 ease-out text-center transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
                  <span className="relative z-10">Brick Module</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex-1 flex  justify-center items-center">
            <div className="relative">
              <img
                src="/images/file.png"
                alt="Cartoon illustration"
                className="w-160 h-160 object-cover animate-pulse rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-white-600 to-orange-600 rounded-2xl blur opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
