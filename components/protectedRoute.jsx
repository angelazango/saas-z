// src/components/ProtectedRoute.jsx
'use client'; // This component needs to run on the client-side

import { useEffect } from 'react'; // To run code when the component loads
import { useSelector, useDispatch } from 'react-redux'; // To talk to our Redux manager
import { useRouter } from 'next/navigation'; // To move between pages
import { checkLoginStatus } from '../redux/features/auth/authSlice'; // Our status checker action

// This component acts like a bouncer. It lets 'children' (your actual page content) through
// ONLY if the user is logged in.
export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch(); // Our tool to tell the Redux manager what to do
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Ask the manager: "Is anyone logged in?"
  const router = useRouter(); // Our tool to change pages

  // This code runs when the component loads or when 'isLoggedIn' changes.
  useEffect(() => {
    // First, always check the "secret notebook" to update our Redux manager's status.
    dispatch(checkLoginStatus());

    // If, after checking, no one is logged in, send them to the login page.
    if (!isLoggedIn) {
      router.push('/auth'); // Send them to the login door!
    }
  }, [isLoggedIn, router, dispatch]); // Re-run if these change

  // If someone IS logged in, show the content (the children).
  // Otherwise, if they're NOT logged in, show nothing (or a loading message)
  // while they are being redirected.
  return isLoggedIn ? (
    <>{children}</> // If logged in, show whatever is inside this ProtectedRoute
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="text-white text-2xl animate-pulse">Checking membership...</div>
    </div>
  );
}