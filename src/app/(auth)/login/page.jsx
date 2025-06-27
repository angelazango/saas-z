'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login, checkLoginStatus } from '@/src/redux/slice/authSlice';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (username === 'admin' && password === 'password123') {
        await dispatch(login({ username, rememberMe })).unwrap();
        // The useEffect above will handle the redirect when isLoggedIn changes
      } else {
        setError('Invalid username or password. Try admin/password123.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-500
       to-orange-700"
        >

        <div className="text-white text-2xl animate-pulse">Logging in...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover" style={{ 
      backgroundImage: "url('/images/constr.jpeg')"}}>
      <div className="backdrop-blur-xl bg-white/30 rounded-xl p-6 w-full max-w-md border-t-4 border-yellow-400">
        <div className="flex justify-center mb-6">
          {/* Logo or icon can go here */}
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Welcome back!</h2>
        <p className="text-center text-gray-800 mb-8">Please enter your email and password to access your account.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Name 
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300
               rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
               transition duration-200 ease-in-out hover:border-blue-400"
              placeholder="e.g., admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password input with Remember Me and Forgot Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
             
            </div>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md
               shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition 
               duration-200 ease-in-out hover:border-blue-400"
              placeholder="e.g., password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

             <button
                type="button"
                onClick={() => router.push('/forgot-password')}
                className="text-sm ml-71 text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </button>
            {/* <div className="flex items-center justify-end mt-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div> */}
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center
             px-4 py-3 border border-transparent rounded-md shadow-sm text-base
              font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 
              ease-in-out transform hover:scale-105"
          >
            <LogIn size={20} className="mr-2" /> Log In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't yet have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-blue-600 hover:text-blue-800
               transition duration-200 ease-in-out inline-flex items-center"
            >
              <UserPlus size={16} className="mr-1" /> Register
            </button>
          </p>
        </div>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-yellow-400">or Register With</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-7">
          <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition">
            <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}