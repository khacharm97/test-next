import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "@/components/ui/Modal";

describe("Modal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders when isOpen=true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("hides when isOpen=false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose on Escape key press", async () => {
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    await user.keyboard("{Escape}");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on outside click", async () => {
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const backdrop = screen.getByRole("dialog");
    // Click on the backdrop (outside the modal content)
    await user.click(backdrop);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders title when provided", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "modal-title");
  });

  it("renders actions when provided", () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        actions={<button>Close</button>}
      >
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});

