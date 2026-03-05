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
    expect(hasHelpOrVersion(["node", "skykoi", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "skykoi", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "skykoi", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "skykoi", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "skykoi", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "skykoi", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "skykoi", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "skykoi"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "skykoi", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "skykoi", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "skykoi", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "skykoi", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "skykoi", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "skykoi", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "skykoi", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "skykoi", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "skykoi", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "skykoi", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "skykoi", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "skykoi", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "skykoi", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "skykoi", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node", "skykoi", "status"],
    });
    expect(nodeArgv).toEqual(["node", "skykoi", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node-22", "skykoi", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "skykoi", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node-22.2.0.exe", "skykoi", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "skykoi", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node-22.2", "skykoi", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "skykoi", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node-22.2.exe", "skykoi", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "skykoi", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["/usr/bin/node-22.2.0", "skykoi", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "skykoi", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["nodejs", "skykoi", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "skykoi", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["node-dev", "skykoi", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "skykoi", "node-dev", "skykoi", "status"]);

    const directArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["skykoi", "status"],
    });
    expect(directArgv).toEqual(["node", "skykoi", "status"]);

    const bunArgv = buildParseArgv({
      programName: "skykoi",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "skykoi",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "skykoi", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "skykoi", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "skykoi", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "skykoi", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "skykoi", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "skykoi", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "skykoi", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "skykoi", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
