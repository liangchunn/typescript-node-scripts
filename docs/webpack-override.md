---
id: webpack-override
title: Overriding Webpack Configuration
---

_WARNING: This feature is marked as experimental and should not be used in production, unless you know exactly what you're doing!_

To override and merge your custom webpack configuration, create a file called `webpack.config.override.js` in your root folder.

This file is then used to be merged into the base configuration that TNS provides, for example, forcing the build to always be in production mode:

```js
module.exports = {
  mode: 'production' // always force production mode
}
```