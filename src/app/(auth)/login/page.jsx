'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Check localStorage for login status on mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedLoggedIn === 'true' && storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      setMessage('Welcome back! You are logged in!');
      router.push('/');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'ananfack@gmail.com' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setMessage('Welcome! You are logged in!');
      router.push('/');
    } else {
      setMessage('Wrong email or password. Try again!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('You have logged out!');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-blue-50 justify-center flex items-center ">
        <div className="bg-black-800 p-8 rounded-lg border shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4"> Success!</h1>
          <p className="text-gray-700 mb-4">Hello {email}!</p>
          <p className="text-gray-600 mb-6">You are now logged in ! enjoy the app.</p>
          {/* <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4
             rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen ">
      {/* Main Container */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <div className="flex w-full max-w-6xl items-center gap-12">
          {/* Left Side - Login Form */}
          <div className="flex-1">
            <div className="max-w-lg">
              <div className="relative mb-8">
                
              </div>

              <h1 className="text-4xl font-bold text-blue-700 text-left mb-2">Log In</h1>
              <p className="text-gray-300 mb-8 text-left">
                Welcome back! Please enter your details
              </p>

              {message && (
                <div
                  className={`p-3 rounded mb-4 ${
                    message.includes('Welcome') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                    autoFocus
                  />
                </div>

                <div className="relative">
                  <label className="block text-black-900 text-sm font-medium mb-2">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <div
                    className="absolute right-3 top-10 cursor-pointer text-gray-500
                     hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                  <div className="text-right mt-2">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full group relative  border-2 
                  bg-blue-600
                px-8 py-4 rounded-xl text-lg font-bold">
                <span className="relative z-10 text-white-50">Log in</span>
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-600">Or Continue With</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <button className="group relative overflow-hidden border-2 px-8 py-2 
                rounded-xl border-gray-200   text-center transform hover:scale-105
                 hover:shadow-2xl hover:shadow-white/20">
                  <span className="flex items-center gap-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>Google</span>
                  </span> 
                </button>
                <button className="group relative overflow-hidden border-2 border-gray-200 
                 text-gray-900 px-8 py-2 rounded-xl font-bold transition-all duration-500 ease-out 
                 text-center transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
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
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="  items-center">
            <div className="">
              <Image
                src="/images/lad.png"
                alt="Login illustration"
                width={940}
                height={950}
                className="w-180 h-180  
                animate-pulse
                 hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -inset-1  rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}