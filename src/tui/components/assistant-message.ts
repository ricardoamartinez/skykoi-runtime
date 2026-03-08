import { Container, Markdown, Spacer, Text } from "@mariozechner/pi-tui";
import chalk from "chalk";
import { markdownTheme, theme } from "../theme/theme.js";

function buildDivider(label: string, width = 60): string {
  const dashLen = Math.max(0, width - label.length - 2);
  const dashes = "─".repeat(dashLen);
  return `${theme.dim(label.toUpperCase())} ${theme.border(dashes)}`;
}

function formatTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return theme.dim(`${h}:${m}`);
}

let _agentLabel = "skykoi";

export function setAssistantLabel(label: string) {
  _agentLabel = label || "skykoi";
}

export class AssistantMessageComponent extends Container {
  private body: Markdown;

  constructor(text: string) {
    super();
    const divider = `${buildDivider(_agentLabel)} ${formatTime()}`;
    this.body = new Markdown(text, 1, 0, markdownTheme, {
      color: (line) => theme.fg(line),
    });
    this.addChild(new Spacer(1));
    this.addChild(new Text(divider, 1, 0));
    this.addChild(this.body);
  }

  setText(text: string) {
    this.body.setText(text);
  }
}
