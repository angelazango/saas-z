
'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col 
    bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="relative">
          <h2 className="text-7xl md:text-8xl font-black text-transparent
           bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400
            mb-4 tracking-tight">
            SAAS-Z
          </h2>
          <div className="absolute -top-2 -left-2 w-full h-full text-7xl 
          md:text-8xl font-black text-purple-500/20 -z-10">
            SAAS-Z
          </div>
        </div>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience the future of SaaS management with our cutting-edge solutions
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/dashboard/home/overview"
            className="group relative bg-gradient-to-r from-purple-600 to-purple-700
             text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25
              transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
               font-semibold text-lg min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500
             to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              Inventory Module
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            href="/dashboards/block"
            className="group relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 
            rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300
             transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              Brick Construction Module
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="flex justify-center space-x-8 mt-16 opacity-60">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
    </div>
  );
}