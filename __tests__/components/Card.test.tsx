import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card", () => {
  it("renders title", () => {
    render(<Card title="Test Card">Card content</Card>);
    
    expect(screen.getByText("Test Card")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Card>Card content</Card>);
    
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card className="custom-class">Card content</Card>
    );
    
    const card = container.querySelector(".custom-class");
    expect(card).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(<Card>Card content</Card>);
    
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });
});

