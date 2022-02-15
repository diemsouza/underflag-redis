import { ICacheProvider, BaseFeature } from 'underflag';
import Redis from 'ioredis';

interface RedisCacheProviderOptions {
    /** The redis url connection */
    url?: string,
    /** Lifetime (in seconds) of each feature in memory. Default: 3600 */
    lifetime?: number
}

export class RedisCacheProvider implements ICacheProvider {
    private redis: Redis.Redis;
    private lifetime?: number;

    constructor(options: RedisCacheProviderOptions) {
        this.redis = new Redis(options.url)
        this.lifetime = options.lifetime || 3600;
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        const result = await this.redis.get(key);
        return result ? { key, value: JSON.parse(result) } : undefined;
    }

    async set(data: BaseFeature): Promise<void> {
        await this.redis.set(data.key, JSON.stringify(data.value), 'EX', this.lifetime);
    }
}