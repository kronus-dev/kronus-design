import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProcessList } from "@/components/kronos/process-list";
import { processes } from "@/lib/data";

const firstRow = () => within(screen.getByRole("table")).getAllByRole("row")[1];

describe("ProcessList", () => {
  it("shows the first ten processes, newest first", () => {
    render(<ProcessList processes={processes} />);
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(11); // header + 10
    expect(firstRow()).toHaveTextContent("P-2026-034");
    expect(screen.getByText("Showing 1 to 10 of 34 results")).toBeInTheDocument();
  });

  it("cycles the status sort when the header is clicked", async () => {
    const user = userEvent.setup();
    render(<ProcessList processes={processes} />);
    const header = within(screen.getByRole("table")).getByRole("button", { name: /status/i });

    await user.click(header);
    expect(screen.getByRole("columnheader", { name: /status/i })).toHaveAttribute("aria-sort", "ascending");
    expect(firstRow()).toHaveTextContent("Awarded");

    await user.click(header);
    expect(firstRow()).toHaveTextContent("Under evaluation");

    await user.click(header);
    expect(screen.getByRole("columnheader", { name: /status/i })).toHaveAttribute("aria-sort", "none");
    expect(firstRow()).toHaveTextContent("P-2026-034");
  });

  it("pages through the list and goes back to page 1 when sorting", async () => {
    const user = userEvent.setup();
    render(<ProcessList processes={processes} />);

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText("Showing 11 to 20 of 34 results")).toBeInTheDocument();
    expect(firstRow()).toHaveTextContent("P-2026-024");

    await user.click(screen.getByRole("button", { name: "Sort by status" }));
    expect(screen.getByText("Showing 1 to 10 of 34 results")).toBeInTheDocument();
  });

  it("colours each status", () => {
    render(<ProcessList processes={processes} />);
    const status = within(firstRow()).getByText("Not started");
    expect(status).toHaveClass("text-zinc-200");
  });
});
