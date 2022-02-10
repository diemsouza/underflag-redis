import { ICacheProvider, Feature } from 'underflag';
import { createClient } from 'redis';

interface RedisCacheProviderOptions {
    /** The redis instance */
    client: any,
    /** Lifetime (in seconds) of each feature in memory. Default: 3600 */
    lifetime?: number
}

interface CreateOptions {
    /** The redis client url */
    url?: string,
    /** Lifetime (in seconds) of each feature in memory. Default: 3600 */
    lifetime?: number
}

export async function createCacheProvider(options?: CreateOptions): Promise<RedisCacheProvider> {
    const client = createClient(
        options && options.url
            ? { url: options.url }
            : undefined
    );
    await client.connect();
    const provider = new RedisCacheProvider({
        client,
        lifetime: options?.lifetime
    })
    return provider;
}

export class RedisCacheProvider implements ICacheProvider {
    private client: any;
    private lifetime?: number;

    constructor(options: RedisCacheProviderOptions) {
        if (!options.client || !options.client.get || !options.client.set) {
            throw new Error('The client is not a valid instance of redis');
        }
        this.client = options.client;
        this.lifetime = options.lifetime || 3600;
    }

    async get(key: string): Promise<Feature | undefined> {
        const result = await this.client.get(key);
        return result ? { key, value: JSON.parse(result) } : undefined;
    }

    async set(data: Feature): Promise<void> {
        await this.client.set(data.key, JSON.stringify(data.value), { EX: this.lifetime });
    }
}