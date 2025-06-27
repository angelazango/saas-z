'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '@/src/redux/slice/authSlice';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check login status when component mounts
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to login if NOT authenticated
    if (!isLoggedIn) {
      router.push('/signup'); // or '/signup' if you prefer
    }
  }, [isLoggedIn, router]);

  // Show loading state while checking authentication
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl animate-pulse">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Main Content */}
      <div className="flex-1 p-8 flex flex-col justify-center items-center bg-gray-900">
        <div className="max-w-lg text-center">
          {/* Logo/Title with shadow effect */}
          <div className="relative mb-8">
            <h2 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              SAAS-Z
            </h2>
            <h3 className="absolute top-0 left-0 w-full h-full text-7xl md:text-8xl font-black text-purple-500/20 -z-10">
              SAAS-Z
            </h3>
          </div>
          
          {/* Tagline */}
          <p className="text-xl text-white font-bold mb-12 leading-relaxed">
            Experience the future of SaaS management with our cutting-edge solutions
          </p>

          {/* Buttons - centered and responsive */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard/home/overview"
              className="border border-white bg-transparent hover:bg-white hover:bg-opacity-20 text-white
                px-8 py-4 rounded-lg text-lg font-bold transition-colors text-center"
            >
              Inventory Module
            </Link>

            <Link
              href="/dashboards/Analytics"
              className="border border-white bg-transparent hover:bg-white hover:bg-opacity-20 text-white 
                px-8 py-4 rounded-lg text-lg font-bold transition-colors text-center"
            >
              Brick Module
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div 
        // className="flex-1 relative"
        // style={{
        //   backgroundImage: `url(/images/site.jpeg)`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        {/* Optional overlay for better text readability if you want to add content here */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
}