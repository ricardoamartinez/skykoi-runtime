import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "SKYKOI",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "SKYKOI", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "SKYKOI", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "SKYKOI", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "SKYKOI", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "SKYKOI", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "SKYKOI", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs(["node", "SKYKOI", "--dev", "--profile", "work", "status"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs(["node", "SKYKOI", "--profile", "work", "--dev", "status"]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".SKYKOI-dev");
    expect(env.SKYKOI_PROFILE).toBe("dev");
    expect(env.SKYKOI_STATE_DIR).toBe(expectedStateDir);
    expect(env.SKYKOI_CONFIG_PATH).toBe(path.join(expectedStateDir, "SKYKOI.json"));
    expect(env.SKYKOI_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      SKYKOI_STATE_DIR: "/custom",
      SKYKOI_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.SKYKOI_STATE_DIR).toBe("/custom");
    expect(env.SKYKOI_GATEWAY_PORT).toBe("19099");
    expect(env.SKYKOI_CONFIG_PATH).toBe(path.join("/custom", "SKYKOI.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", {})).toBe("SKYKOI doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", { SKYKOI_PROFILE: "default" })).toBe(
      "SKYKOI doctor --fix",
    );
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", { SKYKOI_PROFILE: "Default" })).toBe(
      "SKYKOI doctor --fix",
    );
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", { SKYKOI_PROFILE: "bad profile" })).toBe(
      "SKYKOI doctor --fix",
    );
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("SKYKOI --profile work doctor --fix", { SKYKOI_PROFILE: "work" }),
    ).toBe("SKYKOI --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("SKYKOI --dev doctor", { SKYKOI_PROFILE: "dev" })).toBe(
      "SKYKOI --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", { SKYKOI_PROFILE: "work" })).toBe(
      "SKYKOI --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("SKYKOI doctor --fix", { SKYKOI_PROFILE: "  jbSKYKOI  " })).toBe(
      "SKYKOI --profile jbSKYKOI doctor --fix",
    );
  });

  it("handles command with no args after SKYKOI", () => {
    expect(formatCliCommand("SKYKOI", { SKYKOI_PROFILE: "test" })).toBe(
      "SKYKOI --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm SKYKOI doctor", { SKYKOI_PROFILE: "work" })).toBe(
      "pnpm SKYKOI --profile work doctor",
    );
  });
});
