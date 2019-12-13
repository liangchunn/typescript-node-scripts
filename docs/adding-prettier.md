---
id: adding-prettier
title: Adding Prettier
---

## Adding Prettier Into Your Project

> This feature is available starting from version 3 of `typescript-node-scripts`

1. In your project folder, install Prettier and the ESLint plugins:

```sh
# npm
npm i -D prettier eslint-plugin-prettier eslint-config-prettier

# yarn
yarn add prettier eslint-plugin-prettier eslint-config-prettier --dev
```

2. Add the plugins to your `.eslintrc.json`

```diff
{
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
+   "plugin:prettier/recommended",
+   "prettier"
  ],
  ...
  "overrides": [
    {
      ...
      "extends": [
        "plugin:@typescript-eslint/recommended",
+       "prettier",
+       "prettier/@typescript-eslint",
+       "plugin:prettier/recommended"
      ],
    }
  ]
}
```
