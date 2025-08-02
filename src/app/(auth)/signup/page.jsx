
'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsSignedUp(true);
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Store new user credentials (this is a demo; never do this in production)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('isLoggedIn', 'true');
    setIsSignedUp(true);
    router.push('/');
  };

  if (isSignedUp) {
    return (
      <div className="min-h-screen bg-blue-50 justify-center flex items-center">
        <div className="bg-white p-8 rounded-lg border shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Account Created!</h1>
          <p className="text-gray-700 mb-4">Welcome, {email}!</p>
          <p className="text-gray-600 mb-6">You are now signed up and logged in.</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="flex w-full max-w-6xl items-center gap-12">
          <div className="flex-1">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-blue-700 text-left mb-2">Sign Up</h1>
              <p className="text-gray-300 mb-8 text-left">
                Create your account to get started
              </p>

              {message && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {message}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-900 text-sm font-medium mb-2">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <div
                    className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Re-type your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 px-8 py-4 rounded-xl text-lg font-bold text-white hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-600">Or Continue With</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                {/* Google Button */}
                <button className="border-2 px-8 py-2 rounded-xl border-gray-200 hover:scale-105 hover:shadow-2xl">
                  <span className="flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>Google</span>
                  </span>
                </button>

                {/* Facebook Button */}
                <button className="border-2 border-gray-200 text-gray-900 px-8 py-2 rounded-xl font-bold hover:scale-105 hover:shadow-2xl">
                  <span className="flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_(2019).png/512px-Facebook_Logo_(2019).png"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                    <span>Facebook</span>
                  </span>
                </button>
              </div>

              <div className="text-center text-gray-300">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Log in
                </a>
              </div>
            </div>
          </div>

          <div>
            <Image
              src="/images/lad.png"
              alt="Signup illustration"
              width={940}
              height={950}
              className="w-180 h-180  hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
