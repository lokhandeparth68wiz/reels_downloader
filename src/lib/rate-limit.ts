export interface RateTracker {
  count: number;
  resetTime: number;
}

const limiters = new Map<string, RateTracker>();

export function rateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = limiters.get(ip);

  if (!entry) {
    limiters.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true; // Allowed
  }

  if (now > entry.resetTime) {
    limiters.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true; // Allowed
  }

  if (entry.count < maxRequests) {
    entry.count += 1;
    return true; // Allowed
  }

  return false; // Rate limited
}
