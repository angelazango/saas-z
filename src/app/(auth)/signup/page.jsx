'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, LogIn, Eye, EyeOff, Mail } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate password strength (optional)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Check if running in browser environment
      if (typeof window !== 'undefined') {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(
          (user) => user.username === username || user.email === email
        );

        if (userExists) {
          setError('Username or email already taken. Please choose another.');
          return;
        }

        const newUser = { username, email, password };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        setSuccess('Account created successfully! Redirecting to login...');
        
        // Clear form
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

        // Redirect after delay
        setTimeout(() => {
          router.push('/login');
          // Alternative if router doesn't work:
          // window.location.href = '/login';
        }, 1500);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong during signup. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center bg-cover justify-center bg-gradient-to-br p-4" 
      style={{ 
        backgroundImage: "url('/images/compa.jpeg')"
      }}
    >
      <div className="backdrop-blur-xl bg-white/30 rounded-xl p-6 shadow-lg border border-white/40 p-8 shadow-xl w-full max-w-md border-t-4 border-yellow-400">
        <div className="flex justify-center mb-6">
          <UserPlus size={40} className="text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create your Account!
        </h2>
        <p className="text-center text-gray-600 font-bold mb-3">
          Join now to streamline your experience from day one
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out hover:border-blue-400"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="newUsername"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out hover:border-blue-400"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out hover:border-blue-400"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out hover:border-blue-400"
                placeholder="Type your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <UserPlus size={20} className="mr-2" /> Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out inline-flex items-center"
            >
              <LogIn size={16} className="mr-1" /> Login
            </button>
          </p>
        </div>

        {/* Social Login Divider */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-orange-400">or Register With</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
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