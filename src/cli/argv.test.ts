import { describe, expect, it } from "vitest";
import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "SKYKOI", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "SKYKOI", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "SKYKOI", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "SKYKOI", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "SKYKOI", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "SKYKOI", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "SKYKOI", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "SKYKOI"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "SKYKOI", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "SKYKOI", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "SKYKOI", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "SKYKOI", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "SKYKOI", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "SKYKOI", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "SKYKOI", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "SKYKOI", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "SKYKOI", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "SKYKOI", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "SKYKOI", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "SKYKOI", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "SKYKOI", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "SKYKOI", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node", "SKYKOI", "status"],
    });
    expect(nodeArgv).toEqual(["node", "SKYKOI", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node-22", "SKYKOI", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "SKYKOI", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node-22.2.0.exe", "SKYKOI", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "SKYKOI", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node-22.2", "SKYKOI", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "SKYKOI", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node-22.2.exe", "SKYKOI", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "SKYKOI", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["/usr/bin/node-22.2.0", "SKYKOI", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "SKYKOI", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["nodejs", "SKYKOI", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "SKYKOI", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["node-dev", "SKYKOI", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "SKYKOI", "node-dev", "SKYKOI", "status"]);

    const directArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["SKYKOI", "status"],
    });
    expect(directArgv).toEqual(["node", "SKYKOI", "status"]);

    const bunArgv = buildParseArgv({
      programName: "SKYKOI",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "SKYKOI",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "SKYKOI", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "SKYKOI", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "SKYKOI", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "SKYKOI", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "SKYKOI", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "SKYKOI", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "SKYKOI", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "SKYKOI", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
