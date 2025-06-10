// "use client";

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation'; // ✅ Next.js router for client-side redirect

// import FormHeader from '../../../../../../../components/dashboard/FormHeader';
// import TextInput from '../../../../../../../components/FormInputs/TextInput';
// import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
// import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';

// export default function NewCategory() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [loading, setLoading] = useState(false);
//   const router = useRouter(); // ✅ Initialize router

//   const onSubmit = async (data) => {
//     console.log("Submitting category:", data);
//     setLoading(true);
//     const baseUrl = "http://localhost:3000"; // ⚠️ Make sure this works with your API

//     try {
//       const response = await fetch(`${baseUrl}/api/categories`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const newCategory = await response.json();
//         console.log("Category created:", newCategory);

//         reset();

//         // ✅ Redirect to Categories Page after success
//         router.push("/dashboard/inventory/categories"); // 🔁 Replace with your actual Categories path
//       } else {
//         console.error("Failed to create category");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <FormHeader title="New Category" href="/dashboard/inventory/" />

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
//         shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
//       >
//         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//           <TextInput  
//             label="Category Title"
//             name="title"
//             register={register}
//             errors={errors}
//           />

//           <TextAreaInput
//             label="Category Description"
//             name="description"
//             register={register}
//             errors={errors}
//           />
//         </div>

//        <SubmitButton isLoading={loading} title="Create Category" />
//       </form>
//     </div>
//   );
// }
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import FormHeader from '../../../../../../../components/dashboard/FormHeader';
import TextInput from '../../../../../../../components/FormInputs/TextInput';
import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';

export default function NewCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Get existing categories from localStorage
      const existing = JSON.parse(localStorage.getItem("categories")) || [];

      // Add the new category
      const updatedCategories = [...existing, data];

      // Save back to localStorage
      localStorage.setItem("categories", JSON.stringify(updatedCategories));

      // Reset form and redirect
      reset();
      router.push("/dashboard/inventory/categories"); // ✅ redirect to Categories page
    } catch (error) {
      console.error("LocalStorage error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormHeader title="New Category" href="/dashboard/inventory/" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
        shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />

          <TextAreaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>

        <SubmitButton isLoading={loading} title="Create Category" />
      </form>
    </div>
  );
}
