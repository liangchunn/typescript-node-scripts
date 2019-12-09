---
id: custom-module-path
title: Custom Module Paths
---

TNS supports custom module path mapping. You can add a custom path mapping like so in `tsconfig.json`:

```json
{
  "baseUrl": ".",
  "paths": {
    "~/*": ["src/*"]
  }
}
```

This configuration allows you to import any module which resolves absolutely to `src`.

```ts
// src/lib/a/b/Module.ts

// instead of
import Module from '../../../Module'

// you can do
import Module from '~/Module'
```

Unlike the TypeScript compiler which does not emit resolved paths, TNS takes care of resolving all custom module paths during build time.

## References

- https://www.typescriptlang.org/docs/handbook/module-resolution.html
