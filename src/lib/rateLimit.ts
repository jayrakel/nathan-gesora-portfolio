// Per-IP sliding-window rate limiter, in-memory.
// Adequate for a low-traffic single-instance serverless function.
// If this ever needs to be correct across multiple instances,
// move to a dedicated rate-limit service rather than adding a database.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;
const MAX_TRACKED_IPS = 1000;

const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Simple garbage collection for long-running instances.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, timestamps] of hits) {
      const valid = timestamps.filter(
        (timestamp) => now - timestamp < WINDOW_MS
      );

      if (valid.length === 0) {
        hits.delete(key);
      } else {
        hits.set(key, valid);
      }
    }
  }

  const timestamps = (hits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);

  return false;
}
