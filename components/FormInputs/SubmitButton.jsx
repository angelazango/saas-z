import React from 'react'
import { Plus } from 'lucide-react'

export default function SubmitButton({ isLoading, title }) {
  return (
    <div className="sm:col-span-1">
      {isLoading ? (
        <button
          disabled
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none 
          focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 
          dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5C100 78.3 77.6 100.5 50 100.5S0 78.3 0 50.5 22.4 0.5 50 0.5 100 22.7 100 50.5ZM9.1 50.5a40.9 40.9 0 1081.8 0 40.9 40.9 0 10-81.8 0Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9 39.1c2.6-.7 4.1-3.4 3.1-5.9a50.6 50.6 0 00-12.2-19.2c-2-2.1-5.3-2-7.4 0l-1.7 1.6c-2.1 2-2.2 5.3-.2 7.4a40.6 40.6 0 0110.3 16.1c.7 2.6 3.4 4 5.9 3.1Z"
              fill="currentColor"
            />
          </svg>
          Saving {title}... Please wait
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white 
          bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-purple-800"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Save {title}</span>
        </button>
      )}
    </div>
  )
}
