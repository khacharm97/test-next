"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { RegisterUserDto, ApiError } from "@/lib/types";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Tabs from "@/components/ui/Tabs";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterUserDto>({
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterUserDto, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterUserDto, string>> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend: RegisterUserDto = {
        email: formData.email,
        password: formData.password,
        ...(formData.fullName && { fullName: formData.fullName }),
      };

      const response = await registerUser(dataToSend);
      setSuccessMessage(
        response.message || "User registered successfully!"
      );
      setShowSuccessModal(true);
      setFormData({ email: "", password: "", fullName: "" });
      router.refresh();
    } catch (error) {
      const apiError = error as ApiError;
      setApiError(
        apiError.message || "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterUserDto]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const tabs = [
    {
      id: "register",
      label: "Register",
      content: (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            User Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              errorMessage={errors.email}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              errorMessage={errors.password}
              required
            />
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe (optional)"
            />
            {apiError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {apiError}
                </p>
              </div>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </div>
      ),
    },
    {
      id: "users",
      label: "View Users",
      content: (
        <div className="max-w-md mx-auto text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View all registered users
          </p>
          <Link href="/users">
            <Button variant="primary">Go to Users Page</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            ← Back to Home
          </Link>
        </div>
        <Tabs tabs={tabs} defaultTabId="register" />
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            router.refresh();
            router.push("/users");
          }}
          title="Registration Successful"
          actions={
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                router.refresh();
                router.push("/users");
              }}
            >
              View Users
            </Button>
          }
        >
          <p className="text-gray-700 dark:text-gray-300">{successMessage}</p>
        </Modal>
      </div>
    </div>
  );
}

