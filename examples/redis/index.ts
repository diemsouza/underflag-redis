import { Underflag } from 'underflag';
import { RedisCacheProvider } from '../../src/providers/RedisCacheProvider';
import config from './config.json';
import objData from './object.json';

const print = async (feature: Underflag, key: string) => {
    const data = await feature.getFeature(key);
    return {
        key,
        status: data?.isOn() ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
    };
};

(async () => {
    // use data and cache provider
    const cacheProvider = new RedisCacheProvider({ lifetime: 30 });
    const underflag = new Underflag({ dataProvider: objData, cacheProvider });

    // check flags
    const list: any[] = [];
    for (const key of config.features) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);
    process.exit(0)
})();