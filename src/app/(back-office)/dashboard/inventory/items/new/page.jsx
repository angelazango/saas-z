// "use client";
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import FormHeader from '../../../../../../../components/dashboard/FormHeader';
// import TextInput from '../../../../../../../components/FormInputs/TextInput';
// import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
// import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';
// import SelectInput from '../../../../../../../components/FormInputs/SelectInput';
// import { UploadButton } from '@uploadthing/react';

// export default function NewItem() {
//   const [imageUrl, setImageUrl] = useState("");
  
//   const categories = [
//     {
//       label: "Electronics",
//       value: "fgcui356767"
//     },
//     {
//       label: "Equipments",
//       value: "branch457676"
//     },
//   ];

//   const Units = [
//     {
//       label: "Kg",
//       value: "fgcui356767"
//     },
//     {
//       label: "Pcs",
//       value: "branch457676"
//     },
//   ];

//   const brands = [
//     {
//       label: "Angela",
//       value: "fgcui356767"
//     },
//     {
//       label: "Adidas",
//       value: "branch457676"
//     },
//   ];

//   const Warehouses = [
//     {
//       label: "Warehouse Bamenda",
//       value: "fgcui356767"
//     },
//     {
//       label: "Warehouse Yaounde",
//       value: "branch457676"
//     },
//     {
//       label: "Warehouse Graoua",
//       value: "branch457677"
//     },
//   ];

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     // Include the image URL in the form data
//     const formData = {
//       ...data,
//       imageUrl: imageUrl
//     };
    
//     console.log("Submitting item:", formData);
//     setLoading(true);
//     const baseUrl = "http://localhost:3000";

//     try {
//       const response = await fetch(`${baseUrl}/api/items`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log("Item created:", await response.json());
//         reset();
//         setImageUrl(""); // Reset image URL
//       } else {
//         console.error("Failed to create item");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <FormHeader title="New Items" href="/dashboard/inventory/" />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
//         shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
//       >
//         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
//           <TextInput
//             label="Item Title"
//             name="title"
//             register={register}
//             errors={errors}
//             className="w-full"
//           />

//           <SelectInput
//             name="categoryId"
//             label="Select the Item Category"
//             register={register}
//             className="w-full"
//             options={categories}
//           />

//           <TextInput
//             label="Item SKU"
//             name="SKU"
//             register={register}
//             errors={errors}
//             className="w-full"
//           />

//           <TextInput
//             label="Item barcode"
//             name="barcode"
//             register={register}
//             errors={errors}
//             className="w-full"
//           />

//           <TextInput
//             label="Quantity"
//             name="Qty"
//             register={register}
//             errors={errors}
//             className="w-full"
//           />

//           <SelectInput
//             label="Select the Item Unit"
//             name="unitId"
//             register={register}
//             errors={errors}
//             className="w-full"
//             options={Units}
//           />

//           <SelectInput
//             label="Select the Item Brand"
//             name="brandId"
//             register={register}
//             errors={errors}
//             className="w-full"
//             options={brands}
//           />

//           <SelectInput
//             label="Select the Item Warehouse"
//             name="warehouseId"
//             register={register}
//             errors={errors}
//             className="w-full"
//             options={Warehouses}
//           />

//           <TextInput
//             label="Buying Price"
//             name="buyingPrice"
//             register={register}
//             type="number"
//             className="w-full"
//             errors={errors}
//           />

//           <TextInput
//             label="Selling Price"
//             name="sellingPrice"
//             type="number"
//             register={register}
//             errors={errors}
//             className="w-full"
//           />

//           <div className="sm:col-span-2">
//             <TextAreaInput
//               label="Item Description"
//               name="description"
//               register={register}
//               errors={errors}
//             />
//           </div>

//           {/* Image Upload Section */}
//           <div className="sm:col-span-2">
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Item Image
//             </label>
            
//             <div className="flex flex-col items-center justify-center w-full">
//               {imageUrl ? (
//                 <div className="relative w-full max-w-sm mb-4">
//                   <img
//                     src={imageUrl}
//                     alt="Item preview"
//                     className="w-full h-48 object-cover rounded-lg border border-gray-300"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setImageUrl("")}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-4">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                       <span className="font-semibold">Click to upload</span> item image
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <UploadButton
//                 endpoint="imageUploader"
//                 onClientUploadComplete={(res) => {
//                   if (res && res[0]) {
//                     setImageUrl(res[0].url || res[0].fileUrl);
//                     console.log("Upload completed:", res[0]);
//                   }
//                 }}
//                 onUploadError={(error) => {
//                   console.error("Upload error:", error);
//                   alert(`Upload failed: ${error.message}`);
//                 }}
//                 className="ut-button:bg-blue-500 ut-button:hover:bg-blue-600"
//               />
//             </div>
//           </div>
//         </div>

//         <SubmitButton isLoading={loading} title="Create Item" />
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; // For navigation after submit
import FormHeader from "../../../../../../../components/dashboard/FormHeader";
import TextInput from "../../../../../../../components/FormInputs/TextInput";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";
import TextAreaInput from "../../../../../../../components/FormInputs/TextAreaInput";
import SelectInput from "../../../../../../../components/FormInputs/SelectInput";
import { UploadButton } from "@uploadthing/react";

export default function NewItem() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  const categories = [
    { label: "Electronics", value: "fgcui356767" },
    { label: "Equipments", value: "branch457676" },
  ];

  const Units = [
    { label: "Kg", value: "fgcui356767" },
    { label: "Pcs", value: "branch457676" },
    { label: "Cm", value: "branch457676" },
    { label: "Inches", value: "branch457676" },
  ];

  const brands = [
    { label: "Angela", value: "fgcui356767" },
    { label: "Adidas", value: "branch457676" },
  ];

  const Warehouses = [
    { label: "Warehouse Bamenda", value: "fgcui356767" },
    { label: "Warehouse Yaounde", value: "branch457676" },
    { label: "Warehouse Graoua", value: "branch457677" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      imageUrl,
      createdAt: new Date().toISOString(), // Add timestamp
    };

    setLoading(true);
    const baseUrl = "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Save the new item to localStorage
        const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
        storedItems.push(formData);
        localStorage.setItem("items", JSON.stringify(storedItems));

        // Trigger custom event for immediate table update
        window.dispatchEvent(new CustomEvent("itemsUpdated"));

        reset();
        setImageUrl("");

        // Show success message
        alert("Item created successfully!");

        // Redirect to /items page after a short delay
        setTimeout(() => {
          router.push("/dashboard/inventory/items");
        }, 1000);
      } else {
        console.error("Failed to create item");
        alert("Failed to create item. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while creating the item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormHeader title="New Items" href="/dashboard/inventory/items" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
        shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Item Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            name="categoryId"
            label="Select the Item Category"
            register={register}
            className="w-full"
            options={categories}
          />

          <TextInput
            label="Item SKU"
            name="SKU"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Item barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Quantity"
            name="Qty"
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            label="Select the Item Unit"
            name="unitId"
            register={register}
            errors={errors}
            className="w-full"
            options={Units}
          />

          <SelectInput
            label="Select the Item Brand"
            name="brandId"
            register={register}
            errors={errors}
            className="w-full"
            options={brands}
          />

          <SelectInput
            label="Select the Item Warehouse"
            name="warehouseId"
            register={register}
            errors={errors}
            className="w-full"
            options={Warehouses}
          />

          <TextInput
            label="Buying Price"
            name="buyingPrice"
            register={register}
            type="number"
            className="w-full"
            errors={errors}
          />

          <TextInput
            label="Selling Price"
            name="sellingPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          <div className="sm:col-span-2">
            <TextAreaInput
              label="Item Description"
              name="description"
              register={register}
              errors={errors}
            />
          </div>

          {/* Image Upload Section */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Item Image
            </label>

            <div className="flex flex-col items-center justify-center w-full">
              {imageUrl ? (
                <div className="relative w-full max-w-sm mb-4">
                  <img
                    src={imageUrl}
                    alt="Item preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-32 border-2 
                border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mb-4">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> item
                      image
                    </p>
                  </div>
                </div>
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setImageUrl(res[0].url || res[0].fileUrl);
                    console.log("Upload completed:", res[0]);
                  }
                }}
                onUploadError={(error) => {
                  console.error("Upload error:", error);
                  alert(`Upload failed: ${error.message}`);
                }}
                className="ut-button:bg-blue-500 ut-button:hover:bg-blue-600"
              />
            </div>
          </div>
        </div>

        <SubmitButton isLoading={loading} title="Create Item" />
      </form>
    </div>
  );
}