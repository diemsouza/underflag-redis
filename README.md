
# Redis Provider

This is a Redis provider for underflag (feature flag/feature toggle)

## Install

Using npm:

```bash
npm install underflag-redis
```

Using yarn:

```bash
yarn add underflag-redis
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag, JsonDataProviders } from "underflag";
import { RedisCacheProvider } from "underflag-redis";
import redis from 'redis';

const client = createClient();
await client.connect();
const cacheProvider = new RedisCacheProvider({ client, lifetime: 60 });

await redis.connect();
const dataProvider = new JsonDataProvider({ data: { feature: true }});
const underflag = new Underflag({ dataProvider, cacheProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features collection in redis with the key and value fields._

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)