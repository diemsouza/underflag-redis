import { Underflag, JsonDataProvider, isOn } from 'underflag';
import { RedisCacheProvider } from '../../src/providers/RedisCacheProvider';
import { createClient } from 'redis';
import config from './config.json';
import objData from './object.json';

const print = async (feature: Underflag, key: string) => {
    const data = await feature.getFeature(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
    };
};

(async () => {
    // config data provider


    // config cache provider
    const client = createClient({
        url: config.redisUrl
    });
    await client.connect();

    // use data and cache provider
    const dataProvider = new JsonDataProvider({ data: objData });
    const cacheProvider = new RedisCacheProvider({ client, lifetime: 60 });
    const underflag = new Underflag({ dataProvider, cacheProvider });

    // check flags
    const list: any[] = [];
    for (const key of config.features) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

    client.disconnect();
})();