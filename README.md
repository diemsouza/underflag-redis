
# Redis Provider

This is a Redis provider for underflag (feature flag/feature toggle)

> ⚠️ This repository has been **archived** for visual organization on GitHub.  
> It is part of the [`underflag`](https://github.com/diemsouza/underflag) monorepo, where it's maintained and updated.  
> The package is still available on [NPM](https://www.npmjs.com/package/underflag-redis).

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
import { RedisCacheProvider } from "underflag-redis";

const dataProvider = new JsonDataProvider({ 
    data: { feature: true }}
);
const cacheProvider = new RedisCacheProvider();
const underflag = new Underflag({ dataProvider, cacheProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
