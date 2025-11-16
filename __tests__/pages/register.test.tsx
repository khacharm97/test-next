import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "@/app/auth/register/page";
import * as api from "@/lib/api";

// Mock the API module
vi.mock("@/lib/api", () => ({
  registerUser: vi.fn(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Registration Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("form renders correctly (email, password, fullName inputs)", () => {
    render(<RegisterPage />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const { container } = render(<RegisterPage />);
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    const form = submitButton.closest("form");
    
    if (form) {
      fireEvent.submit(form);
    } else {
      fireEvent.click(submitButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("shows errors on invalid email", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");
    
    const form = emailInput.closest("form");
    if (form) {
      fireEvent.submit(form);
    } else {
      const submitButton = screen.getByRole("button", { name: /register/i });
      fireEvent.click(submitButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("shows errors on short password", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "12345");
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
    });
  });

  it("calls registerUser() on submit", async () => {
    const user = userEvent.setup();
    const mockRegisterUser = vi.mocked(api.registerUser);
    mockRegisterUser.mockResolvedValue({ message: "Success" });
    
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const fullNameInput = screen.getByLabelText(/full name/i);
    
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(fullNameInput, "John Doe");
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
      });
    });
  });

  it("shows loading state", async () => {
    const user = userEvent.setup();
    const mockRegisterUser = vi.mocked(api.registerUser);
    // Create a promise that we can control
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockRegisterUser.mockReturnValue(promise as any);
    
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /registering/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /registering/i })).toBeDisabled();
    });
    
    // Resolve the promise to clean up
    resolvePromise!({ message: "Success" });
  });

  it("shows success modal after mock successful response", async () => {
    const user = userEvent.setup();
    const mockRegisterUser = vi.mocked(api.registerUser);
    mockRegisterUser.mockResolvedValue({ message: "User registered successfully!" });
    
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
      expect(screen.getByText(/user registered successfully!/i)).toBeInTheDocument();
    });
  });

  it("shows error message on failed request", async () => {
    const user = userEvent.setup();
    const mockRegisterUser = vi.mocked(api.registerUser);
    mockRegisterUser.mockRejectedValue({ message: "Registration failed" });
    
    render(<RegisterPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    
    const submitButton = screen.getByRole("button", { name: /register/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
      expect(screen.getByText(/registration failed/i)).toHaveAttribute("role", "alert");
    });
  });
});

