export type StorageMode = "postgres-ready" | "file-store";

export function getStorageMode(): StorageMode {
  const usePostgres = process.env.LEAD_STORAGE_MODE === "postgres";
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

  if (usePostgres && hasDatabaseUrl) {
    return "postgres-ready";
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Durable lead storage is required in production. Set LEAD_STORAGE_MODE=postgres and DATABASE_URL.");
  }

  return "file-store";
}
