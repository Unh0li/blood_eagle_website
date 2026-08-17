import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    // A stray package-lock.json in the home directory made Turbopack infer
    // C:\Users\Windows11 as the workspace root. Pin it to this project.
    // fileURLToPath, not URL.pathname — the latter yields "/C:/..." on Windows.
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
