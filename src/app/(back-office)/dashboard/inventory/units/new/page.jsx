"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../../../../components/dashboard/FormHeader';
import TextInput from '../../../../../../../components/FormInputs/TextInput';
import SubmitButton from '../../../../../../../components/FormInputs/SubmitButton';
import TextAreaInput from '../../../../../../../components/FormInputs/TextAreaInput';

export default function NewUnit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Submitting unit:", data);
    setLoading(true);
    const baseUrl = "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/units`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("units created:", await response.json());
        reset();
      } else {
        console.error("Failed to create units");
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
      <FormHeader title="New Units" href="/dashboard/inventory/" />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
        shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput  
            label="unit Title"
            name="title"
            register={register}
            errors={errors}
            className='w-full'
          />
             <TextInput  
            label="unit Abbreviation"
            name="abbreviation"
            register={register}
            errors={errors}
            className='w-full'
          />
          {/* <TextAreaInput
            label="Category Description"
            name="description"  // ✅ fixed spelling
            register={register}
            errors={errors}
          /> */}
        </div>

        <SubmitButton isLoading={loading}
         title="Create unit" />
      </form>
    </div>
  );
}
