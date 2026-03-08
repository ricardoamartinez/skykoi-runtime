import type { SkyKoiPluginApi } from "../../src/plugins/types.js";
import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: SkyKoiPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
