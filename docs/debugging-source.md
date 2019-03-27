---
id: debugging-source
title: Debugging your Source
---

## Visual Studio Code
_This method is **NOT** recommended due to ts-node being quite slow at running and compiling your source code._

First off, you would need to install `ts-node` and `tsconfig-paths`:

```sh
yarn add ts-node tsconfig-paths --dev
```

Then add the following into your configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Source (ts-node)",
  "protocol": "inspector",
  "runtimeArgs": ["-r", "ts-node/register", "-r", "tsconfig-paths/register"],
  "args": ["${workspaceFolder}/src/index.ts"],
  "env": {
    "TS_NODE_PROJECT": "./tsconfig.json",
    "TS_NODE_FILES": "true"
  }
}
```

Next, add the `files` entry into your `tsconfig.json`:

```json
{
  "files": ["src"]
}
```

You can now use breakpoints and run the build under debug mode.
