import chalk, { Chalk } from "chalk";
import { SKYKOI_PALETTE } from "./palette.js";

const hasForceColor =
  typeof process.env.FORCE_COLOR === "string" &&
  process.env.FORCE_COLOR.trim().length > 0 &&
  process.env.FORCE_COLOR.trim() !== "0";

const baseChalk = process.env.NO_COLOR && !hasForceColor ? new Chalk({ level: 0 }) : chalk;

const hex = (value: string) => baseChalk.hex(value);

export const theme = {
  accent: hex(SKYKOI_PALETTE.accent),
  accentBright: hex(SKYKOI_PALETTE.accentBright),
  accentDim: hex(SKYKOI_PALETTE.accentDim),
  info: hex(SKYKOI_PALETTE.info),
  success: hex(SKYKOI_PALETTE.success),
  warn: hex(SKYKOI_PALETTE.warn),
  error: hex(SKYKOI_PALETTE.error),
  muted: hex(SKYKOI_PALETTE.muted),
  heading: baseChalk.bold.hex(SKYKOI_PALETTE.accent),
  command: hex(SKYKOI_PALETTE.accentBright),
  option: hex(SKYKOI_PALETTE.warn),
} as const;

export const isRich = () => Boolean(baseChalk.level > 0);

export const colorize = (rich: boolean, color: (value: string) => string, value: string) =>
  rich ? color(value) : value;
