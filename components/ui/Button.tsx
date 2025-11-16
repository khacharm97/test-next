import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
}

const variantStyles = {
  primary:
    "bg-primary-600 text-black hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-600",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600",
  outline:
    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:text-white dark:hover:bg-red-600",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const textColorClass = variant === "outline" ? "text-primary-600 dark:text-primary-400" : "text-black dark:text-white";
  
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${textColorClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

