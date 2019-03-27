---
id: debugging-webpack
title: Debugging your Webpack Build
---

## Visual Studio Code

TNS incrementally outputs a single bundle in `build/bundle.js` (via webpack) when running `yarn build`.
To debug the bundle, add the following into the `configurations` array of your `launch.json` file:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Webpack Build (via Node)",
  "protocol": "inspector",
  "program": "${workspaceFolder}/build/bundle.js"
}
```

You can now set breakpoints and run the task in order to debug your build.