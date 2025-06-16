
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import FormHeader from "../../../../../../../components/dashboard/FormHeader";
import TextInput from "../../../../../../../components/FormInputs/TextInput";
import TextAreaInput from "../../../../../../../components/FormInputs/TextAreaInput";
import SelectInput from "../../../../../../../components/FormInputs/SelectInput";
import SubmitButton from "../../../../../../../components/FormInputs/SubmitButton";

export default function NewWarehouse() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  const Warehouses = [
    { label: "Warehouse Bamenda", value: "bamenda" },
    { label: "Warehouse Yaounde", value: "yaounde" },
    { label: "Warehouse Garoua", value: "garoua" },
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
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    const baseUrl = "http://localhost:3000";

    try {
      const response = await fetch(`${baseUrl}/api/warehouse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Save to localStorage
        const storedWarehouses = JSON.parse(localStorage.getItem("warehouses") || "[]");
        storedWarehouses.push(formData);
        localStorage.setItem("warehouses", JSON.stringify(storedWarehouses));

        // Notify components
        window.dispatchEvent(new CustomEvent("itemsUpdated"));

        reset();
        setImageUrl("");

        alert("Warehouse created successfully!");

        setTimeout(() => {
          router.push("/dashboard/inventory/items");
        }, 1000);
      } else {
        alert("Failed to create warehouse. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormHeader title="New Warehouse" href="/dashboard/inventory/warehouse" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded-lg 
        shadow sm:p-6 dark:bg-gray-800 dark:border-gray-500 mx-auto mt-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Warehouse Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            label="Warehouse Location"
            name="warehouseId"
            register={register}
            errors={errors}
            className="w-full"
            options={Warehouses}
          />

          <div className="sm:col-span-2">
            <TextAreaInput
              label="Warehouse Description"
              name="description"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <SubmitButton isLoading={loading} title="Create Warehouse" />
      </form>
    </div>
  );
}
