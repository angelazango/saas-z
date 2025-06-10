import React from 'react'
import { Plus } from 'lucide-react'

export default function SubmitButton({isLoading,title}) {
  return (
    
        <div className="sm:col-span-1">

        {isLoading? (
          <button 
          disabled
          type="button"
          className='text-white bg-purple-700
          hover:bg-purple-800 focus:ring-4 focus:outline-none 
          focus-purple-300 font-medium rounded-lg text-sm px-5 py-2.5
          text-center mr-2 
          dark:bg-purple-600 
          dark:hover:bg-purple-700
          dark:focus:ring-purple-800 inline-flex
          items-center
           '> 
           <svg
           aria-hidden="true"
           role="status"
           className='inline w-4 h-4 mr-3 text-white animate-spin'
           viewBox='0 0 100 102'
           fill='none'
           xmlns='http://www.w3.org/2000/svg'>

<path 
d="M100 50.5908C100 78.2051 77.2051 100.
   591 50 100.591C22.3858 100.591 0 78.
   2051 0 50.5908C0 22.9766 22.3858 0.
   59082 50 0. "
fill='#E5E7EB'
/>

           </svg>
           Saving {title} Please wait...
           
           </button>
        ) : (
          <button type='submit'
          className='inline-flex items-center px-5 py-2.5
          mt-4 sm:sm-6 text-sm font-medium text-center text-white 
          bg-blue-700
          rounded-lg focus:ring-4 focus:ring-blue-200
          dark:focus:ring-blue-900 
          hover:bg-purple-800'>
            <Plus className="w-5 h-5 mr-2"/>
            <span> Save {title}</span>
          
          </button>
        )
        
        }

        </div>
  )
}
