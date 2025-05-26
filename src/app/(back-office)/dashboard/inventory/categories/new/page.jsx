// "use client";
// import React, { useState } from 'react';
// import Link from "next/link";
// // Remove CrossSign import if not used
// // import CrossSign from "lucide-react";
// import FormHeader from '../../../../../../../components/dashboard/FormHeader';
// import { useForm } from 'react-hook-form';
// import TextInput from '../../../../../../../components/FormInputs/TextInput';

// export default function NewCategory() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [loading,setLoading]=useState(false);

//   // onSubmit handler
//   function onSubmit(data) {
//     console.log(data); 
//     resizeTo()     
    
//     // handle form data here
//   }

//   return (
//     <div>
//       {/* header */}
//       <FormHeader title="New Category" href="#" />

//       {/* form */}
//       <form 
//         onSubmit={handleSubmit(onSubmit)}
//         className='w-full max-w-4xl p-4 bg-white border 
//         border-gray-300 rounded-lg shadow sm:p-6 
//         dark:bg-gray-800 
//         dark:border-gray-500 mx-auto mt-3'
//       >
//         <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
//           <TextInput  
//             label="Category Title"  
//             name="title"  // <-- Fixed here
//             register={register} 
//             errors={errors} 
//           /> 
//         </div>

//         <div className="py-4 mt-6 sm:col-span-1">

//         {loading? (
//           <button 
//           disabled
//           type="button"
//           className='text-white bg-purple-700
//           hover:bg-purple-800 focus:ring-4 focus:outline-none 
//           focus-purple-300 font-medium rounded-lg text-sm px-5 py-2.5
//           text-center mr-2 
//           dark:bg-purple-600 
//           dark:hover:bg-purple-700
//           dark:focus:ring-purple-800 inline-flex
//           items-center
//            '> 
//            <svg
//            aria-hidden="true"
//            role="status"
//            className='inline w-4 h-4 mr-3 text-white animate-spin'
//            viewBox='0 0 100 102'
//            fill='none'
//            xmlns='http://www.w3.org/2000/svg'>

// {/* <path 
// d="M100 50.5908C100 78.2051 77.2051 77.6142 100.591 50 100.591C22.3"

//            </svg>
           
//            </button>
//         )} */}





        
//           <button type="submit" className="w-36 
//           text-white
//             bg-blue-700 hover:bg-blue-800 
//             focus:ring-blue-300 font-medium 
//             rounded-lg text-sm 
//             px-5 py-2.5 text-center 
//             dark:bg-blue-600 dark:hover:bg-blue-700 
//             dark:focus:ring-blue-800">
//             Submit
//           </button>



//         </div>
//       </form>
//     </div>
//   );
// }
 