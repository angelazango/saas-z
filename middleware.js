// middleware.js
import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // ✅ Not logged in and trying to access any page except /login
  if (!session && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // ✅ Already logged in but on /login → redirect to home
 {showModal && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Are you sure you want to logout?</h2>

      {isLoggingOut ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Logging out...</span>
        </div>
      ) : (
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
)}


  return res
}
