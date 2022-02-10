
# Redis Provider

This is a Redis provider for underflag (feature flag/feature toggle)

## Install

Using npm:

```bash
npm install underflag underflag-redis
```

Using yarn:

```bash
yarn add underflag underflag-redis
```

## How to use

Example using data from json, but you can get data from anywhere.

```js
import { Underflag, JsonDataProvider } from "underflag";
import { createCacheProvider } from "underflag-redis";

const dataProvider = new JsonDataProvider({ 
    data: { feature: true }}
);
const cacheProvider = await createCacheProvider();
const underflag = new Underflag({ dataProvider, cacheProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

Example using your own redis instance

```bash
npm install redis
```

```js
import { Underflag, JsonDataProviders } from "underflag";
import { RedisCacheProvider } from "underflag-redis";
import { createClient } from 'redis';

const client = createClient();
await client.connect();
const cacheProvider = new RedisCacheProvider({ client, lifetime: 60 });

await redis.connect();
const dataProvider = new JsonDataProvider({ 
    data: { feature: true }
});
const underflag = new Underflag({ dataProvider, cacheProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)