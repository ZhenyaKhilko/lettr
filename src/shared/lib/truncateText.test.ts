import { describe, expect, it } from "vitest";
import { getTooltipTitle, truncateText } from "./truncateText";

describe("truncateText", () => {
  it("returns original text when within limit", () => {
    expect(truncateText("Acme", 40)).toBe("Acme");
  });

  it("truncates with ellipsis when over limit", () => {
    const longName = "A".repeat(50);
    expect(truncateText(longName, 40)).toBe(`${"A".repeat(40)}...`);
  });

  it("returns tooltip title only when truncated", () => {
    expect(getTooltipTitle("Acme", 40)).toBeUndefined();
    expect(getTooltipTitle("A".repeat(50), 40)).toHaveLength(50);
  });
});
