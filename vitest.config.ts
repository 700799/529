import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    // Mirror the "@/*" alias from tsconfig.json so tests import the same way
    // the app does.
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    // e2e/ is Playwright's; vitest must not try to run it.
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
