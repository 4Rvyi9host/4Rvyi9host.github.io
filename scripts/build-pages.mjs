import { spawnSync } from "node:child_process";
import { cp, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextCli, "build"], {
  cwd: projectRoot,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/portofolio" },
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const exportDir = path.join(projectRoot, "out");
for (const entry of await readdir(exportDir)) {
  await cp(path.join(exportDir, entry), path.join(projectRoot, entry), {
    recursive: true,
    force: true,
  });
}

console.log("Static site copied to the repository root for GitHub Pages.");
