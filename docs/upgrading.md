---
id: upgrading
title: Upgrading + Changelog
---

# Upgrading TNS + Changelog

## `3.x.x` to `4.x.x`

TNS `4.x.x` supports **TypeScript >=3.3.1 <4.1.0** and supports **webpack 5**

Simply upgrade the package to get all the latest features:

```sh
# install version 4.x.x of `typescript-node-scripts`
yarn upgrade typescript-node-scripts@^4.0.0
```

## `3.0.x` to `3.1.x`

TNS `3.1.x` supports **TypeScript 3.7** with its new language features.

Additionally, ESLint packages are now moved internally so you don't have to manage them by yourself. This means that you can remove the following packages in your `package.json`

- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `babel-eslint`
- `eslint-plugin-import`

```sh
# npm
npm uninstall @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint babel-eslint eslint-plugin-import

# yarn
yarn remove @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint babel-eslint eslint-plugin-import
```

Additionally, path mapping is now an opt-in feature and not generated in the initial `create` command.

## `2.x.x` to `3.x.x`

### `3.x.x` Breaking Changes

Versions `1.x.x` up to `2.x.x` of `typescript-node-scripts` used TSLint as the default linter.
However, [TSLint has announced that it will be deprecated sometime in 2019](https://github.com/palantir/tslint/issues/4534), and packages that use TSLint should migrate to use ESLint.

Version `3.x.x` of `typescript-node-scripts` will now use ESLint instead of TSLint to lint your project.

### Automatic Migration via CLI

We've included a migration script so that you can migrate your TSLint configuration to ESLint configuration without heavylifting, and installs the necessary base packages to make your project ESLint compatible.

```sh
# go to your project root
cd <app_directory>

# install version 3.x.x of `typescript-node-scripts`
yarn upgrade typescript-node-scripts@^3.0.0

# run the migration script
npx typescript-node-scripts migration/tslint-to-eslint
```

You're done! Be sure to go through the console output so that you can see what potential issues that needs to be addressed.

### Gotchas

Since there is a disparity between ESLint and TSLint rules and plugins, custom added TSLint rules and plugins has to be migrated to ESLint **manually**.

> If you are using the default `tslint.json` generated with `typescript-node-scripts`, you shouldn't need to do anything more than running the migration script.

TypeScript support in ESLint is supported by the [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) toolchain, and you should take a look at the repository to find out how to migrate your rules and plugins manually.

Additionally, tools like [`tslint-to-eslint-config`](https://github.com/typescript-eslint/tslint-to-eslint-config) can aid in converting your custom TSLint rules to ESLint-compatible rules.

### Adding Prettier

A lot of projects use Prettier, and here's a short guide on how to get Prettier up and running with ESLint.

> Be sure that you have already ran the migration script above, have Prettier installed, and have an existing `.prettierrc` already in your project root.

1. Install the ESLint plugins:

```sh
yarn add eslint-config-prettier eslint-plugin-prettier --dev
```

2. Modify `extends` in `.eslintrc.json`:

```diff
    "extends": [
        "eslint:recommended",
+       "prettier"
    ],
    "overrides: [
        {
            "extends": [
                "plugin:@typescript-eslint/recommended"
+               "prettier",
+               "prettier/@typescript-eslint"
            ]
        }
    ]
```
