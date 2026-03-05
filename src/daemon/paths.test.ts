import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveGatewayStateDir } from "./paths.js";

describe("resolveGatewayStateDir", () => {
  it("uses the default state dir when no overrides are set", () => {
    const env = { HOME: "/Users/test" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".skykoi"));
  });

  it("appends the profile suffix when set", () => {
    const env = { HOME: "/Users/test", SKYKOI_PROFILE: "rescue" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".skykoi-rescue"));
  });

  it("treats default profiles as the base state dir", () => {
    const env = { HOME: "/Users/test", SKYKOI_PROFILE: "Default" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".skykoi"));
  });

  it("uses SKYKOI_STATE_DIR when provided", () => {
    const env = { HOME: "/Users/test", SKYKOI_STATE_DIR: "/var/lib/SKYKOI" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/var/lib/SKYKOI"));
  });

  it("expands ~ in SKYKOI_STATE_DIR", () => {
    const env = { HOME: "/Users/test", SKYKOI_STATE_DIR: "~/SKYKOI-state" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/Users/test/SKYKOI-state"));
  });

  it("preserves Windows absolute paths without HOME", () => {
    const env = { SKYKOI_STATE_DIR: "C:\\State\\SKYKOI" };
    expect(resolveGatewayStateDir(env)).toBe("C:\\State\\SKYKOI");
  });
});
