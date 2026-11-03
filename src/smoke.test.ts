import { describe, expect, it } from "vitest";

describe("test setup", () => {
  it("runs TypeScript tests in Node, outside a browser", () => {
    expect(typeof window).toBe("undefined");
  });
});
