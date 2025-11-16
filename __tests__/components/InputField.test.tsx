import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "@/components/ui/InputField";

describe("InputField", () => {
  it("renders label and input with matching htmlFor/id", () => {
    const { container } = render(<InputField label="Email" name="email" />);
    
    const input = screen.getByRole("textbox", { name: /email/i });
    const label = container.querySelector("label");
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "input-email");
    expect(label).toHaveAttribute("for", "input-email");
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <InputField
        label="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole("textbox");
    await user.type(input, "test@example.com");
    
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(
      <InputField
        label="Email"
        name="email"
        errorMessage="Email is required"
      />
    );
    
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toHaveAttribute("role", "alert");
  });

  it("sets aria-invalid and aria-describedby correctly when error exists", () => {
    render(
      <InputField
        label="Email"
        name="email"
        errorMessage="Email is required"
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "input-email-error");
  });

  it("does not set aria-invalid when no error", () => {
    render(<InputField label="Email" name="email" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });
});

