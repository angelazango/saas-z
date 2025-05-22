import React from 'react';

const SearchInput = () => {
  return (
    <form>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 
            text-gray-500 
            dark:text-gray-400" 
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-4-4m0 0a7 7 0 1 0-9.9 0 7 7 0 0 0 9.9 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border
           border-gray-300 text-gray-900 
           text-sm rounded-lg 
           focus:ring-purple-500 
           focus:border-purple-500
            block w-full pl-10
             px-3 py-1.5  dark:bg-gray-700 
             dark:border-gray-600 
             dark:placeholder-gray-400 
             dark:text-white
             dark:focus:ring-blue-500
             dark:focus:border-blue-500"
          placeholder="Search in customers ..."
          required
        />
      </div>
    </form>
  );
};

export default SearchInput;
