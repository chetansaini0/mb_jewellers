type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

async function checkDistributedRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return null;
  }

  const namespace = `rate-limit:${key}`;
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const incrementResponse = await fetch(`${url}/incr/${encodeURIComponent(namespace)}`, {
      method: "POST",
      headers: authHeaders,
      cache: "no-store",
    });
    if (!incrementResponse.ok) {
      return null;
    }

    const incrementData = (await incrementResponse.json()) as { result?: number | string };
    const currentCount = Number(incrementData.result ?? 0);
    if (!Number.isFinite(currentCount)) {
      return null;
    }

    if (currentCount === 1) {
      await fetch(`${url}/pexpire/${encodeURIComponent(namespace)}/${windowMs}`, {
        method: "POST",
        headers: authHeaders,
        cache: "no-store",
      });
    }

    if (currentCount > maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    return { allowed: true, remaining: Math.max(0, maxRequests - currentCount) };
  } catch {
    return null;
  }
}

function checkInMemoryRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  buckets.set(key, current);

  return { allowed: true, remaining: maxRequests - current.count };
}

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
) {
  const distributed = await checkDistributedRateLimit(key, maxRequests, windowMs);
  if (distributed) {
    return distributed;
  }
  return checkInMemoryRateLimit(key, maxRequests, windowMs);
}

export function getRequestIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return headers.get("x-real-ip") ?? "unknown";
}
