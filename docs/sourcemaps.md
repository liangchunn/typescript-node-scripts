---
id: sourcemaps
title: Source Maps
---

Source maps are emitted by default, and postfixed with `.map` in the `build` and `dist` folders. These files provide accurate source mappings which are helpful when debugging errors and looking at stack traces during runtime.

In order to tell Node to use these source maps, install the `source-map-support` package.

```sh
yarn add source-map-support
```

Then, make sure that you import and register the source map handlers before anything else:

```ts
// src/index.ts
import 'source-map-support/register'
// import other things that you need below
import * as fs from 'fs'
```