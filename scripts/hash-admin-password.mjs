import { randomBytes, scryptSync } from "node:crypto";

const password = process.env.ADMIN_PASSWORD;

if (!password || password.length < 12) {
  console.error("Set ADMIN_PASSWORD to a strong value of at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
