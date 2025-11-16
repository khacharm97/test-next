import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UsersPage from "@/app/users/page";
import * as api from "@/lib/api";

// Mock the API module
vi.mock("@/lib/api", () => ({
  getUsers: vi.fn(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Users Page", () => {
  const mockUsers = [
    {
      id: "1",
      email: "user1@example.com",
      fullName: "User One",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      email: "user2@example.com",
      fullName: "User Two",
      createdAt: "2024-01-02T00:00:00Z",
    },
  ];

  it("mocks getUsers() to return list", async () => {
    const mockGetUsers = vi.mocked(api.getUsers);
    mockGetUsers.mockResolvedValue(mockUsers);
    
    const page = await UsersPage();
    render(page);
    
    await screen.findByText("user1@example.com");
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
  });

  it("checks that users render in Card components", async () => {
    const mockGetUsers = vi.mocked(api.getUsers);
    mockGetUsers.mockResolvedValue(mockUsers);
    
    const page = await UsersPage();
    render(page);
    
    await screen.findByText("user1@example.com");
    
    // Check that user data is rendered
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();
  });

  it("shows empty state: 'No users found'", async () => {
    const mockGetUsers = vi.mocked(api.getUsers);
    mockGetUsers.mockResolvedValue([]);
    
    const page = await UsersPage();
    render(page);
    
    await screen.findByText(/no users found/i);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("shows error state: shows error message", async () => {
    const mockGetUsers = vi.mocked(api.getUsers);
    mockGetUsers.mockRejectedValue(new Error("Failed to fetch users"));
    
    const page = await UsersPage();
    render(page);
    
    await screen.findByText(/failed to fetch users/i);
    expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch users/i)).toHaveAttribute("role", "alert");
  });

  it("snapshot test to ensure consistent layout", async () => {
    const mockGetUsers = vi.mocked(api.getUsers);
    mockGetUsers.mockResolvedValue(mockUsers);
    
    const page = await UsersPage();
    const { container } = render(page);
    
    await screen.findByText("user1@example.com");
    
    expect(container).toMatchSnapshot();
  });
});

