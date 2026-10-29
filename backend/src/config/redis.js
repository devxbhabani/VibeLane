import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis = new Redis(redisUrl, {
	maxRetriesPerRequest: 3,
	retryStrategy(times) {
		// Stop trying after 5 attempts so offline Redis doesn't spam logs
		if (times > 5) {
			return null;
		}
		return Math.min(times * 100, 2000); // Reconnection backoff
	},
	lazyConnect: true, // Don't crash immediately on boot if Redis is unreachable
});

redis.on("connect", () => console.log("[Redis] Connected successfully"));
redis.on("error", (err) => console.warn("[Redis] Notice:", err.message));

// Attempt initial non-blocking connection
redis.connect().catch((err) => {
	console.warn("[Redis] Optional in-memory cache offline, proceeding with DB fallback:", err.message);
});

export default redis;
