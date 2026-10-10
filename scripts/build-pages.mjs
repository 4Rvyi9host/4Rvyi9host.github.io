import { spawnSync } from "node:child_process";
import { cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const result = spawnSync(process.execPath, [nextCli, "build"], {
  cwd: projectRoot,
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH:
      configuredBasePath === "__ROOT__" ? "" : configuredBasePath ?? "/portofolio",
  },
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const exportDir = path.join(projectRoot, "out");
for (const entry of await readdir(exportDir)) {
  const destination = path.join(projectRoot, entry);
  await rm(destination, { recursive: true, force: true });
  await cp(path.join(exportDir, entry), destination, {
    recursive: true,
    force: true,
  });
}

console.log("Static site copied to the repository root for GitHub Pages.");
