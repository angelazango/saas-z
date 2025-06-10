"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../../../../components/dashboard/FormHeader';
import TextInput from '../../../../../../../components/FormInputs/TextInput';
import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';
import SelectInput from '../../../../../../../components/FormInputs/SelectInput';

export default function NewWarehouse() {
  const selectOptions = [
    {
      label: "Main",
      value: "main" // ✅ corrected
    },
    {
      label: "Branch",
      value: "branch" // ✅ corrected
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [refresh, setRefresh] = useState(false); // To re-trigger fetch

  const onSubmit = async (data) => {
    console.log("Submitting warehouse:", data);
    setLoading(true);
    const baseUrl = "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/warehouse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Warehouse created:", await response.json());
        reset();
      } else {
        console.error("Failed to create warehouse");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* header */}
      <FormHeader title="New Warehouse" href="/dashboard/inventory/" />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
        shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <SelectInput
            name="type"
            label="Select the warehouse type"
            register={register}
            className="w-full"
            options={selectOptions}
          />

          <TextInput
            label="Warehouse Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Warehouse Location"
            name="location"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextAreaInput
            label="Warehouse Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>

        <SubmitButton isLoading={loading} title="Create Warehouse" />
      </form>
    </div>
  );
}



// "use client";
// import React, { useState, useEffect } from 'react'; // ⬅️ Add useEffect here
// import { useForm } from 'react-hook-form';
// import FormHeader from '../../../../../../../components/dashboard/FormHeader';
// import TextInput from '../../../../../../../components/FormInputs/TextInput';
// import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
// import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';
// import SelectInput from '../../../../../../../components/FormInputs/SelectInput';

// export default function NewWarehouse() {
//   const selectOptions = [
//     { label: "Main", Value: "main" },
//     { label: "Branch", Value: "branch" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [loading, setLoading] = useState(false);

//   // 🔽 Your state declarations
//   const [warehouses, setWarehouses] = useState([]);
//   const [refresh, setRefresh] = useState(false);

//   // 🔄 Add this useEffect here
//   useEffect(() => {
//     const fetchWarehouses = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/warehouse");
//         const data = await res.json();
//         setWarehouses(data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };

//     fetchWarehouses();
//   }, [refresh]); // re-fetch whenever refresh changes

//   const onSubmit = async (data) => {
//     console.log("Submitting category:", data);
//     setLoading(true);
//     const baseUrl = "http://localhost:3000";

//     try {
//       const response = await fetch(`${baseUrl}/api/warehouse`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log("Warehouse created:", await response.json());
//         reset();
//         setRefresh(prev => !prev); // 🔁 Trigger re-fetch after creation
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
//       <FormHeader title="New Warehouse" href="/dashboard/inventory/" />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
//         shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
//       >
//         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//           <SelectInput
//             name="type"
//             label="select the warehouse type"
//             register={register}
//             className='w-full'
//             options={selectOptions}
//           />
//           <TextInput  
//             label="Warehouse Title"
//             name="title"
//             register={register}
//             errors={errors}
//             className='w-full'
//           />
//           <TextInput  
//             label="Warehouse Location"
//             name="location"
//             register={register}
//             errors={errors}
//             className='w-full'
//           />
//           <TextAreaInput
//             label="Warehouse Description"
//             name="description"
//             register={register}
//             errors={errors}
//           />
//         </div>

//         <SubmitButton isLoading={loading} title="Create Warehouse" />
//       </form>

//       {/* Optional: Display the list of fetched warehouses */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Existing Warehouses:</h2>
//         <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
//           {warehouses.map((w, index) => (
//             <li key={index}>{w.title} - {w.location}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

