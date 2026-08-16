import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite runs the React dev server. Port 5173 must match the CORS origin
// you configured in Program.cs on the .NET backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
