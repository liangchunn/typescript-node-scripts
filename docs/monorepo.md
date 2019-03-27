---
id: monorepo
title: Monorepo Support
---

To use `typescript-node-scripts` with a monorepo like lerna with yarn workspaces, you need to add `--monorepo` to the start and build scripts.

```json
{
  "scripts": {
    "start": "typescript-node-scripts start --monorepo"
  }
}
```

Then, you can use `lerna run <start|build> --stream` in your root `package.json`.