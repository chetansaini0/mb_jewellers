export type StorageMode = "postgres-ready" | "file-store";

function isFileStorageMode(value: string | undefined) {
  const mode = value?.trim().toLowerCase();
  return mode === "json" || mode === "file" || mode === "file-store";
}

export function getStorageMode(): StorageMode {
  const leadStorageMode = process.env.LEAD_STORAGE_MODE?.trim();
  const usePostgres = leadStorageMode === "postgres";
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL?.trim());

  if (usePostgres && hasDatabaseUrl) {
    return "postgres-ready";
  }

  // Explicit local/dev file mode (also used for `next start` without Postgres).
  if (isFileStorageMode(leadStorageMode)) {
    return "file-store";
  }

  // Vercel production must persist leads durably.
  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
    throw new Error("Durable lead storage is required in production. Set LEAD_STORAGE_MODE=postgres and DATABASE_URL.");
  }

  if (process.env.NODE_ENV === "production" && usePostgres && !hasDatabaseUrl) {
    throw new Error("LEAD_STORAGE_MODE=postgres requires DATABASE_URL.");
  }

  return "file-store";
}
