"use client";
import React from "react";

export default function TextAreaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
      >
        {label}
      </label>

      <div className="mt-2">
        <textarea
          {...register(name, { required: isRequired })}
          name={name}
          id={name}
          rows={5} 
          className="block w-full rounded-md border border-gray-300 py-2 px-3 
          text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 
          sm:text-sm sm:leading-6"
          placeholder={`Type the ${label.toLowerCase()}`}
        />

        {errors[`${name}`] && (
          <span className="text-sm text-red-600">
            {label} is required</span>
        )}
      </div>
    </div>
  );
}
