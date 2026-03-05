import type { SKYKOIPluginApi } from "SKYKOI/plugin-sdk";
import { emptyPluginConfigSchema } from "SKYKOI/plugin-sdk";
import { createDiagnosticsOtelService } from "./src/service.js";

const plugin = {
  id: "diagnostics-otel",
  name: "Diagnostics OpenTelemetry",
  description: "Export diagnostics events to OpenTelemetry",
  configSchema: emptyPluginConfigSchema(),
  register(api: SKYKOIPluginApi) {
    api.registerService(createDiagnosticsOtelService());
  },
};

export default plugin;
