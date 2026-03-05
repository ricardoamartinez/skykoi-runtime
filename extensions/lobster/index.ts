import type { SKYKOIPluginApi } from "../../src/plugins/types.js";
import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: SKYKOIPluginApi) {
  api.registerTool(
    (ctx) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createLobsterTool(api);
    },
    { optional: true },
  );
}
