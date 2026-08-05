function normalizeOrigin(value: string) {
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`.toLowerCase();
  } catch {
    return "";
  }
}

function getAllowedOrigins() {
  const allowed = new Set<string>();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    const normalized = normalizeOrigin(siteUrl);
    if (normalized) allowed.add(normalized);
  }

  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  return allowed;
}

export function isAllowedRequestOrigin(headers: Headers) {
  const origin = headers.get("origin");
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) return false;

  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.has(normalizedOrigin)) return true;

  const requestHost = headers.get("x-forwarded-host") ?? headers.get("host");
  if (requestHost) {
    const forwardedProto = headers.get("x-forwarded-proto");
    const originProtocol = normalizedOrigin.startsWith("http://") ? "http" : "https";
    const hostIsLocal =
      requestHost.startsWith("localhost") ||
      requestHost.startsWith("127.0.0.1") ||
      requestHost.startsWith("[::1]");
    const requestProtocol = forwardedProto ?? (hostIsLocal ? originProtocol : "https");
    const requestOrigin = `${requestProtocol}://${requestHost}`.toLowerCase();
    if (requestOrigin === normalizedOrigin) return true;

    // Same host over http/https (common behind local proxies).
    const requestHostOnly = requestHost.toLowerCase();
    try {
      if (new URL(normalizedOrigin).host === requestHostOnly) return true;
    } catch {
      // ignore invalid origin parsing
    }
  }

  return false;
}
