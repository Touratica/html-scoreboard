import { describe, expect, it } from "vitest";

describe("test setup", () => {
  it("runs TypeScript tests in Node", () => {
    expect(typeof process.versions.node).toBe("number");
  });
});
