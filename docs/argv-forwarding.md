---
id: argv-forwardig
title: Forwarding argv to your App
---

When running in development mode, you can specify all the arguments that you want to forward to your app after the `--` separator in your project's `package.json`:

```json
{
  "scripts": {
    "start": "typescript-node-scripts start --no-collapse -- --arg-for-your-app=true"
  }
}
```

This is particularly useful when your application needs to read arguments from the command line.