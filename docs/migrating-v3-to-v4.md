---
id: migrating-v3-to-v4
title: Migrating from v3 to v4
---

## `4.x.x` Breaking Changes

### ESLint Configuration Changes

Previously in version 3, TNS introduces ESLint due to the deprecation of TSLint. We've 'hacked' together configurations so that ESLint can work, and installed too many packages on the generated template.

Unfortunately this has caused a lot of pain trying to upgrade ESLint plugins like `@typescript-eslint/*` plugins. We've also found out that most of the time, users of TNS do not change `.eslintrc.json` at all. This prompted us to abstract the configuration and provide a way to override it when needed.

If you have your own custom `.eslintrc.json`, you can tell TNS to use it by passing `--override-eslint-config` in `package.json`, otherwise TNS would just ignore it:

```json
{
  "scripts": {
    "start": "typescript-node-scripts start --override-eslint-config",
    "build": "typescript-node-scripts build --override-eslint-config"
  }
}
```

### Prettier

Version 4 also introduces Prettier built-in, which you can configure with a `.prettierrc` file.

The default provided config with a newly generated project looks something like this:

```json
{
  "printWidth": 80,
  "tabWidth": 2
}
```

### Packages

If you're coming from version 3, you should remove the packages from your `package.json`, since they are now installed with TNS:

```diff
"devDependencies": {
- "@typescript-eslint/eslint-plugin": "^2.10.0",
- "@typescript-eslint/parser": "^2.10.0",
- "babel-eslint": "^10.0.3",
- "eslint": "^6.7.2",
- "eslint-plugin-import": "^2.18.2",
}
```

### References

- Prettier configuration: https://prettier.io/docs/en/configuration.html
