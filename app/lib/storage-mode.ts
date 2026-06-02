export function getStorageMode() {
  const usePostgres = process.env.LEAD_STORAGE_MODE === "postgres";
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

  if (usePostgres && hasDatabaseUrl) {
    return "postgres-ready";
  }

  return "file-store";
}
