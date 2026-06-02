import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const buildIdPath = join(root, ".next", "BUILD_ID");
const requiredRoutes = [
  "app/page.tsx",
  "app/faq/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/refund-policy/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/manifest.ts",
  "app/not-found.tsx",
];

let failed = false;

if (!existsSync(buildIdPath)) {
  console.error("verify-production: missing .next/BUILD_ID — run npm run build first");
  failed = true;
} else {
  console.log("verify-production: build artifact OK");
}

for (const route of requiredRoutes) {
  const path = join(root, route);
  if (!existsSync(path)) {
    console.error(`verify-production: missing ${route}`);
    failed = true;
  }
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
for (const script of ["lint", "typecheck", "build"]) {
  if (!pkg.scripts?.[script]) {
    console.error(`verify-production: missing npm script "${script}"`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("verify-production: all checks passed");
