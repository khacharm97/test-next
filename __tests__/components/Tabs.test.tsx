import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "@/components/ui/Tabs";

describe("Tabs", () => {
  const mockTabs = [
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
    { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
  ];

  it("renders all tabs", () => {
    render(<Tabs tabs={mockTabs} />);
    
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /tab 2/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /tab 3/i })).toBeInTheDocument();
  });

  it("switches content when clicking tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);
    
    // Initially shows first tab content
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    
    // Click second tab
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    await user.click(tab2);
    
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(tab2).toHaveAttribute("aria-selected", "true");
  });

  it("supports keyboard navigation with ArrowRight", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);
    
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    tab1.focus();
    
    await user.keyboard("{ArrowRight}");
    
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(document.activeElement).toBe(tab2);
  });

  it("supports keyboard navigation with ArrowLeft", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTabId="tab2" />);
    
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    tab2.focus();
    
    await user.keyboard("{ArrowLeft}");
    
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    expect(tab1).toHaveAttribute("aria-selected", "true");
  });

  it("supports keyboard navigation with Home key", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTabId="tab3" />);
    
    const tab3 = screen.getByRole("tab", { name: /tab 3/i });
    tab3.focus();
    
    await user.keyboard("{Home}");
    
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    expect(tab1).toHaveAttribute("aria-selected", "true");
  });

  it("supports keyboard navigation with End key", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} defaultTabId="tab1" />);
    
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    tab1.focus();
    
    await user.keyboard("{End}");
    
    const tab3 = screen.getByRole("tab", { name: /tab 3/i });
    expect(tab3).toHaveAttribute("aria-selected", "true");
  });

  it("has correct ARIA attributes for tablist/tab/tabpanel", () => {
    render(<Tabs tabs={mockTabs} />);
    
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    
    const tab1 = screen.getByRole("tab", { name: /tab 1/i });
    expect(tab1).toHaveAttribute("aria-controls", "tabpanel-tab1");
    expect(tab1).toHaveAttribute("id", "tab-tab1");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    
    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("id", "tabpanel-tab1");
    expect(tabpanel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });
});

