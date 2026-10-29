import redis from "../config/redis.js";

//Robust Cache Helper
//Handles get, set, delete, and pattern invalidation with automatic JSON parsing
//and silent fallback to prevent crashing the API if Redis is unreachable.

export const cacheService = {
	// Retrieve and parse JSON from Redis
	async get(key) {
		try {
			if (redis.status !== "ready" && redis.status !== "connect")
				return null;
			const data = await redis.get(key);
			return data ? JSON.parse(data) : null;
		} catch (err) {
			console.warn(
				`[cacheService.get] Skipped cache reading for ${key}:`,
				err.message,
			);
			return null;
		}
	},

	// Set key with TTL in seconds
	async set(key, value, ttlSeconds) {
		try {
			if (redis.status !== "ready" && redis.status !== "connect") return;
			await redis.setex(key, ttlSeconds, JSON.stringify(value));
		} catch (err) {
			console.warn(
				`[cacheService.set] Skipped cache writing for ${key}:`,
				err.message,
			);
		}
	},

	// Invalidate a single key
	async del(key) {
		try {
			if (redis.status !== "ready" && redis.status !== "connect") return;
			await redis.del(key);
		} catch (err) {
			console.warn(
				`[cacheService.del] Failed deleting cache key ${key}:`,
				err.message,
			);
		}
	},

	// Invalidate all keys matching a pattern (e.g. "product*")
	async invalidatePattern(pattern) {
		try {
			if (redis.status !== "ready" && redis.status !== "connect") return;
			const keys = await redis.keys(pattern);
			if (keys.length > 0) {
				await redis.del(keys);
			}
		} catch (err) {
			console.warn(
				`[cacheService.invalidatePattern] Failed for pattern ${pattern}:`,
				err.message,
			);
		}
	},
};
