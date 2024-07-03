import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Handle Redis client errors
        this.client.on('error', (error) => {
            console.error('Redis client error:', error);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return await getAsync(key);
    }

    async set(key, value, durationInSeconds) {
        const setAsync = promisify(this.client.set).bind(this.client);
        return await setAsync(key, value, 'EX', durationInSeconds);
    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        return await delAsync(key);
    }
}

// Create and export a singleton instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
