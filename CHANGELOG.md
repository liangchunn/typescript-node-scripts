# [3.2.0-alpha.3](https://github.com/liangchunn/typescript-node-scripts/compare/v3.2.0-alpha.2...v3.2.0-alpha.3) (2020-11-17)


### Bug Fixes

* **typescript:** install ~4.x version of typescript on create ([34fa6d4](https://github.com/liangchunn/typescript-node-scripts/commit/34fa6d46bd3cc66564bd2a60e3e98ec9d25339fd))



# [3.2.0-alpha.2](https://github.com/liangchunn/typescript-node-scripts/compare/v3.2.0-alpha.1...v3.2.0-alpha.2) (2020-11-17)


### Bug Fixes

* **webpack5:** fix config problem and mitigate typing issue ([292b6a8](https://github.com/liangchunn/typescript-node-scripts/commit/292b6a81a56ac61083b88249537d6e4e3e3dc733))



# [3.2.0-alpha.1](https://github.com/liangchunn/typescript-node-scripts/compare/v3.1.2...v3.2.0-alpha.1) (2020-11-17)



## [3.1.2](https://github.com/liangchunn/typescript-node-scripts/compare/v3.1.1...v3.1.2) (2020-03-12)



## [3.1.1](https://github.com/liangchunn/typescript-node-scripts/compare/v3.1.0...v3.1.1) (2020-03-11)


### Features

* **create:** install compatible typescript version on create ([a0c6d14](https://github.com/liangchunn/typescript-node-scripts/commit/a0c6d143d30e2a510da13820f9dc0cd29075d4ce))
* **package:** use tslib to reduce dist size ([1600455](https://github.com/liangchunn/typescript-node-scripts/commit/160045580a86d76a3a7db8750d1a3bc5bc9a6d2e))



# [3.1.0](https://github.com/liangchunn/typescript-node-scripts/compare/v3.0.0...v3.1.0) (2019-12-13)


### Bug Fixes

* **package:** move eslint plugins to dependencies ([e838833](https://github.com/liangchunn/typescript-node-scripts/commit/e83883351c1c9c2a2f7ac94c2f57fc43501f110d))


### Features

* **eslint:** generate .eslintrc for project ([0794693](https://github.com/liangchunn/typescript-node-scripts/commit/079469347fcb24e9f933097241c9eb981dccd901))
* **eslint:** use built in eslint ([dcb4896](https://github.com/liangchunn/typescript-node-scripts/commit/dcb4896854c691ecbd5b89ab2f4b2ff897a5bb38))
* **package:** cleanup, remove usage of mapped paths in template ([4a8050a](https://github.com/liangchunn/typescript-node-scripts/commit/4a8050a31a6aa1f4e3b1c3c9186a151bb0c481dd))
* **prettier:** integrate prettier into tns ([f9213d7](https://github.com/liangchunn/typescript-node-scripts/commit/f9213d72927498685a22a6cd386b5d47bd75be88))
* **ts3.7:** try integrating ts3.7 ([10f14e5](https://github.com/liangchunn/typescript-node-scripts/commit/10f14e52ca06fb2db888c97867e5ee52714a8475))



# [3.0.0](https://github.com/liangchunn/typescript-node-scripts/compare/v3.0.0-alpha.1...v3.0.0) (2019-08-25)


### Bug Fixes

* **eslint:** don't lint template ([42751cf](https://github.com/liangchunn/typescript-node-scripts/commit/42751cf290a3d75b47985d507c92806764f21310))
* **eslint:** fix invalid .eslintrc.json in template ([f9c6f57](https://github.com/liangchunn/typescript-node-scripts/commit/f9c6f57fc825c4a741bcfc223104d2684e5a5cc6))
* **eslint:** lint tests directory, fix lint issue in tests ([3cea4af](https://github.com/liangchunn/typescript-node-scripts/commit/3cea4afcef89c5340ce42d6f19c992e63f6f18c1))
* **eslint:** try fixing eslint issues ([3aed93a](https://github.com/liangchunn/typescript-node-scripts/commit/3aed93abeb9fc702510c7c4bae5ffda3fef70f2e))



# [3.0.0-alpha.1](https://github.com/liangchunn/typescript-node-scripts/compare/v3.0.0-alpha.0...v3.0.0-alpha.1) (2019-08-07)


### Features

* **eslint:** add info for custom tslint.json migration ([f3725fa](https://github.com/liangchunn/typescript-node-scripts/commit/f3725fa4f4d07be77f50aa1706c75a7d5f73420f))



# [3.0.0-alpha.0](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.6...v3.0.0-alpha.0) (2019-08-07)


### Bug Fixes

* **package:** update @babel/code-frame to version 7.5.5 ([06c41cd](https://github.com/liangchunn/typescript-node-scripts/commit/06c41cdb34aafbb000ee91dc1c2453525a9f5486))
* **package:** update @babel/core to version 7.5.0 ([da497fa](https://github.com/liangchunn/typescript-node-scripts/commit/da497fa63d12053fdc588cdbfbad435f482ac4b6))
* **package:** update @babel/core to version 7.5.5 ([e183737](https://github.com/liangchunn/typescript-node-scripts/commit/e183737445086f637444b2a5c55675cd422ad08a))
* **package:** update @babel/preset-env to version 7.5.2 ([1ff6d0d](https://github.com/liangchunn/typescript-node-scripts/commit/1ff6d0dccdcebd280ccf1e8424f98964f1456762)), closes [#123](https://github.com/liangchunn/typescript-node-scripts/issues/123)
* **package:** update @babel/preset-env to version 7.5.5 ([ef37659](https://github.com/liangchunn/typescript-node-scripts/commit/ef37659e32bf1ebdcb74586976a7fa1863a37da6))
* **package:** update webpack to version 4.35.3 ([23461f6](https://github.com/liangchunn/typescript-node-scripts/commit/23461f6c77de9b120b6ebecf93c7f3e5265cc2c6))
* **webpack:** dont emit hash in output on prod builds ([fe8c397](https://github.com/liangchunn/typescript-node-scripts/commit/fe8c3974ec1f1266adb6dfb2e7135ca19f955f60))


### Features

* **eslint:** add migration script ([2ea6a5a](https://github.com/liangchunn/typescript-node-scripts/commit/2ea6a5af0503feac6b376e4dc29738ce7fd1d468)), closes [#96](https://github.com/liangchunn/typescript-node-scripts/issues/96)
* **eslint:** extract utilities ([bac78de](https://github.com/liangchunn/typescript-node-scripts/commit/bac78de86ae7e939eb9540527f16db79b8c693ef))
* **eslint:** support eslint ([a3f800d](https://github.com/liangchunn/typescript-node-scripts/commit/a3f800ddc8bedb2af9565bc0ed8c61cdd78f5ef0)), closes [#96](https://github.com/liangchunn/typescript-node-scripts/issues/96)
* **webpack:** add clean-webpack-plugin ([b264e23](https://github.com/liangchunn/typescript-node-scripts/commit/b264e23d13279585209da3b09e57b04d04c452f7))



## [2.0.6](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.5...v2.0.6) (2019-07-04)


### Bug Fixes

* **package:** update fork-ts-checker-webpack-plugin to version 1.3.7 ([ee83855](https://github.com/liangchunn/typescript-node-scripts/commit/ee83855dd0a049b18974e9810e1efebeaaa20371)), closes [#117](https://github.com/liangchunn/typescript-node-scripts/issues/117)
* **package:** update fs-extra to version 8.1.0 ([75b4f93](https://github.com/liangchunn/typescript-node-scripts/commit/75b4f93bcb6775d6d2df6e47035bfd677e95ee75))
* **package:** update webpack to version 4.35.0 ([3d0ae9c](https://github.com/liangchunn/typescript-node-scripts/commit/3d0ae9c22b386383f0d7414fe95715352726a662)), closes [#118](https://github.com/liangchunn/typescript-node-scripts/issues/118)



## [2.0.5](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.4...v2.0.5) (2019-06-10)


### Features

* **webpack:** emit only errors for tsconfig-paths-webpack-plugin ([7af2490](https://github.com/liangchunn/typescript-node-scripts/commit/7af249089463c9ec92c95461119fa9e76201e115))



## [2.0.4](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.3...v2.0.4) (2019-06-07)


### Bug Fixes

* **webpack:** add missing webpack overide support in build mode ([1ceaaef](https://github.com/liangchunn/typescript-node-scripts/commit/1ceaaef9e198704359119923fe8a1ecd7a3e2c95))



## [2.0.3](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.2...v2.0.3) (2019-06-07)


### Bug Fixes

* **package:** update fork-ts-checker-webpack-plugin to version 1.3.3 ([ebdbe2f](https://github.com/liangchunn/typescript-node-scripts/commit/ebdbe2f6c9c2d2ff36236b39f2162cc11aaf765f))
* **package:** update webpack to version 4.32.0 ([574f35e](https://github.com/liangchunn/typescript-node-scripts/commit/574f35e025bd57a037236fd97f32a45f59b6f857))
* **package:** upgrade and pin docusaurus to 1.11.0 ([7b39236](https://github.com/liangchunn/typescript-node-scripts/commit/7b3923635707cc8415ced7e0794ac3ee4aab443f))
* **package:** upgrade dependencies ([46c3478](https://github.com/liangchunn/typescript-node-scripts/commit/46c3478aa76ad66555f874a02aecbbd771ee51d3))



## [2.0.2](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.1...v2.0.2) (2019-05-16)


### Bug Fixes

* **package:** update @babel/core to version 7.4.4 ([14d6c86](https://github.com/liangchunn/typescript-node-scripts/commit/14d6c866cbe6230a5b57993b13c6a954e3676795))
* **package:** update @babel/preset-env to version 7.4.4 ([3d6de68](https://github.com/liangchunn/typescript-node-scripts/commit/3d6de68e36861a7e50abecc470a54c486de33a26))
* **package:** update babel-loader to version 8.0.6 ([626964a](https://github.com/liangchunn/typescript-node-scripts/commit/626964aeb1c6c27f2a97a4e5e8cd895ccd5e5ae2))
* **package:** update fork-ts-checker-webpack-plugin to version 1.2.0 ([32b1683](https://github.com/liangchunn/typescript-node-scripts/commit/32b168368e8d5b4aa5795b0a39f8d30b329634f1)), closes [#93](https://github.com/liangchunn/typescript-node-scripts/issues/93)
* **package:** update fork-ts-checker-webpack-plugin to version 1.3.2 ([28403e7](https://github.com/liangchunn/typescript-node-scripts/commit/28403e73b717e00af8c590bd9172d0f056e36360))
* **package:** update fs-extra to version 8.0.1 ([9cfca52](https://github.com/liangchunn/typescript-node-scripts/commit/9cfca520a9ee33ae1e764168675f0427dd262879)), closes [#102](https://github.com/liangchunn/typescript-node-scripts/issues/102)
* **package:** update webpack to version 4.31.0 ([74bd0d0](https://github.com/liangchunn/typescript-node-scripts/commit/74bd0d09269d7a4e15f17c9e97913da2f2500008))



## [2.0.1](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.0...v2.0.1) (2019-04-15)


### Bug Fixes

* **package:** update fork-ts-checker-webpack-plugin to version 1.0.1 ([cbbe50f](https://github.com/liangchunn/typescript-node-scripts/commit/cbbe50fc099c4b688cece74e524fbb32d7781a7f))
* **package:** update ts-jest to version 24.0.1 ([eb25ad5](https://github.com/liangchunn/typescript-node-scripts/commit/eb25ad5564013e78d6f9e9f153aafcc99d9ce8ad))


### Features

* **process:** extract app runner into a process handler ([8826297](https://github.com/liangchunn/typescript-node-scripts/commit/8826297b732a84e7d7a8fbfe391318e66feac2a7))
* **webpack:** add case sensitive webpack plugin ([027f926](https://github.com/liangchunn/typescript-node-scripts/commit/027f9262975eaedb05e230bf24dd8e2d762d7f21))



# [2.0.0-beta.5](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2019-03-26)


### Features

* **argv:** forward argv to spawned app ([f26d370](https://github.com/liangchunn/typescript-node-scripts/commit/f26d370b27149ca70658878bb75272115a749587)), closes [#76](https://github.com/liangchunn/typescript-node-scripts/issues/76)



# [2.0.0-beta.4](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2019-03-26)


### Features

* **test:** don't check tests when running run/build ([464a06a](https://github.com/liangchunn/typescript-node-scripts/commit/464a06a08e979a3122fe9f985e9280838b21263c))



# [2.0.0-beta.3](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2019-03-26)


### Features

* **webpack:** support config override, fix empty errors ([dbc7186](https://github.com/liangchunn/typescript-node-scripts/commit/dbc71866e637f3ba98a651520fcf5c5865679643))



# [2.0.0-beta.2](https://github.com/liangchunn/typescript-node-scripts/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2019-03-25)



# [2.0.0-beta.1](https://github.com/liangchunn/typescript-node-scripts/compare/2.0.0-beta.0...v2.0.0-beta.1) (2019-03-25)


### Bug Fixes

* **formatter:** use colors when tty and not ci ([5e3584f](https://github.com/liangchunn/typescript-node-scripts/commit/5e3584fc65eb5e824b43c2f8e5589fb17e665bd7))



# [2.0.0-beta.0](https://github.com/liangchunn/typescript-node-scripts/compare/v1.3.0...2.0.0-beta.0) (2019-03-25)


### Bug Fixes

* **create:** install TNS as a dev dependency ([3978289](https://github.com/liangchunn/typescript-node-scripts/commit/39782899b2d7c5e225f9e3da91a72e44cb5765e5))
* **package:** update @babel/core to version 7.3.4 ([0332dba](https://github.com/liangchunn/typescript-node-scripts/commit/0332dbaf52355ae5895f4e43a9cdd68dd4676dc1))
* **package:** update @babel/preset-env to version 7.3.4 ([3a5cd6f](https://github.com/liangchunn/typescript-node-scripts/commit/3a5cd6f76b1ebdbf2aa002af3c9366975f2bdd96))
* **package:** update webpack to version 4.29.6 ([3f88bb8](https://github.com/liangchunn/typescript-node-scripts/commit/3f88bb83eab0789c031017e475c2b89a5ddecfeb))
* **vendor:** fix spelling ([ee2eaf8](https://github.com/liangchunn/typescript-node-scripts/commit/ee2eaf834b8f8255a4b466d88e603d022356f448))


### Features

* **typescript:** add typescript files ([f8854c2](https://github.com/liangchunn/typescript-node-scripts/commit/f8854c28682d256cbe2ae9ee448696456c73930e))
* **typescript:** finish up typescript support ([2c5512b](https://github.com/liangchunn/typescript-node-scripts/commit/2c5512b32a0d55b4072429748be2bf2c58fc1e8b))



# [1.3.0](https://github.com/liangchunn/typescript-node-scripts/compare/v1.2.0...v1.3.0) (2019-02-19)


### Bug Fixes

* **package:** update @babel/core to version 7.3.3 ([28bad95](https://github.com/liangchunn/typescript-node-scripts/commit/28bad95a2dea896a3e444c82af6918830f0a286c)), closes [#64](https://github.com/liangchunn/typescript-node-scripts/issues/64)
* **package:** update @babel/preset-env to version 7.3.1 ([f7fec24](https://github.com/liangchunn/typescript-node-scripts/commit/f7fec24de3382da52e8710f6fd785560576165e0)), closes [#64](https://github.com/liangchunn/typescript-node-scripts/issues/64)
* **package:** update babel-loader to version 8.0.5 ([2eefbfc](https://github.com/liangchunn/typescript-node-scripts/commit/2eefbfca1ceec3f3d56e93389de6436903f950de))
* **package:** update chalk to version 2.4.2 ([1c7ffd6](https://github.com/liangchunn/typescript-node-scripts/commit/1c7ffd6fd03a5dcb6db4c3d9ea58365eabbac84c))
* **package:** update filesize to version 4.1.2 ([a3f0053](https://github.com/liangchunn/typescript-node-scripts/commit/a3f0053cea3c0de678d490feb57962ba0d67ecc5)), closes [#68](https://github.com/liangchunn/typescript-node-scripts/issues/68)
* **package:** update ts-jest to version 24.0.0 ([1a034c8](https://github.com/liangchunn/typescript-node-scripts/commit/1a034c847fe34ca2a6e0fa9ac24553c6ad161dc3))
* **package:** update webpack to version 4.29.4 ([c072db7](https://github.com/liangchunn/typescript-node-scripts/commit/c072db76c815d323925372ddabea3ec407726354)), closes [#65](https://github.com/liangchunn/typescript-node-scripts/issues/65)
* **package:** update webpack to version 4.29.5 ([c299c65](https://github.com/liangchunn/typescript-node-scripts/commit/c299c65937b247fa221ec366081d291ca15e7bce))


### Features

* **package:** upgrade jest, fix filesize, drop node 6 ([bd2e4d7](https://github.com/liangchunn/typescript-node-scripts/commit/bd2e4d76ac6cf3044d87d8b5e5512da38e150e3e))



# [1.2.0](https://github.com/liangchunn/typescript-node-scripts/compare/v1.1.1...v1.2.0) (2018-12-30)


### Features

* **monorepo:** add support for monorepo ([6a7384f](https://github.com/liangchunn/typescript-node-scripts/commit/6a7384f8f9c31fb3ea9a540856c855af19ee95da))



## [1.1.1](https://github.com/liangchunn/typescript-node-scripts/compare/v1.1.0...v1.1.1) (2018-12-15)


### Bug Fixes

* **template:** remove build, coverage and dist from npm ([171ee66](https://github.com/liangchunn/typescript-node-scripts/commit/171ee666bac9eba3f8e8f1e7d19af9f6c5be2404))



# [1.1.0](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.7...v1.1.0) (2018-12-14)


### Bug Fixes

* **package:** require typescript 3.x, fix fTCWP on 0.5.x ([24b41ce](https://github.com/liangchunn/typescript-node-scripts/commit/24b41ce3e76ba7dbbbc4401b83b3afe07c83f8b1))



## [1.0.7](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.6...v1.0.7) (2018-12-11)


### Bug Fixes

* **package:** update fork-ts-checker-webpack-plugin to version 0.5.1 ([2cac59a](https://github.com/liangchunn/typescript-node-scripts/commit/2cac59a9922759c42e9d5f9307c449b07e92bb6a))
* **package:** update webpack to version 4.27.0 ([5bcee3b](https://github.com/liangchunn/typescript-node-scripts/commit/5bcee3b398b5bc7c4be5346f0cea110e10e0a9e4))
* **package:** update webpack to version 4.27.1 ([e7ba963](https://github.com/liangchunn/typescript-node-scripts/commit/e7ba9638881fc5e2bbf57c62872946bf721f60b5))



## [1.0.6](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.5...v1.0.6) (2018-12-02)


### Bug Fixes

* **test:** use tsConfig instead of tsConfigFile for ts-jest ([0169e47](https://github.com/liangchunn/typescript-node-scripts/commit/0169e4730ace3410bb3838cad7b1a7b6713ffe12))



## [1.0.5](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.4...v1.0.5) (2018-12-01)


### Bug Fixes

* **codeframe:** use new API for @babel/code-frame ([1c93c74](https://github.com/liangchunn/typescript-node-scripts/commit/1c93c74cdd4be0c258983cbf55c9c6b2e0d5c571))



## [1.0.4](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.3...v1.0.4) (2018-12-01)


### Bug Fixes

* **e2e:** fix env detection for travis ([c501d96](https://github.com/liangchunn/typescript-node-scripts/commit/c501d96875115a38eb262cee168111fc6f2d0108))
* **package:** update @babel/core to version 7.1.2 ([53f832e](https://github.com/liangchunn/typescript-node-scripts/commit/53f832e7ccaeedd9306c53f4df7cf5ede69d2004)), closes [#25](https://github.com/liangchunn/typescript-node-scripts/issues/25)
* **package:** update @babel/preset-env to version 7.1.0 ([07a38d4](https://github.com/liangchunn/typescript-node-scripts/commit/07a38d4b7293309f88c24165df72a9b1240e2451)), closes [#25](https://github.com/liangchunn/typescript-node-scripts/issues/25)
* **package:** update babel-loader to version 8.0.4 ([e4950e0](https://github.com/liangchunn/typescript-node-scripts/commit/e4950e008f951d7a61accc659b632537d819e9e7)), closes [#23](https://github.com/liangchunn/typescript-node-scripts/issues/23)
* **package:** update fork-ts-checker-webpack-plugin to version 0.4.10 ([c4f956c](https://github.com/liangchunn/typescript-node-scripts/commit/c4f956c1ac8e045b1df1602f91286febe5209e3d))
* **package:** update strip-ansi to version 5.0.0 ([fc0bf57](https://github.com/liangchunn/typescript-node-scripts/commit/fc0bf5756fb9cd11a00a69094eb5488c1453f72b))
* **package:** update ts-jest to version 23.10.4 ([6b7d9b6](https://github.com/liangchunn/typescript-node-scripts/commit/6b7d9b69d434ce867a9b4c26443d2b68f4487866))
* **package:** update webpack to version 4.20.2 ([dfb06d2](https://github.com/liangchunn/typescript-node-scripts/commit/dfb06d2400e7d26a2c60054b6e8d01bb32397361)), closes [#24](https://github.com/liangchunn/typescript-node-scripts/issues/24)
* **spawn:** fix problem where kill wasnt killing subprocesses ([1cc35c0](https://github.com/liangchunn/typescript-node-scripts/commit/1cc35c0156b4e11526de7c64cdeaf8f8f67eba41))



## [1.0.3](https://github.com/liangchunn/typescript-node-scripts/compare/v1.0.2...v1.0.3) (2018-09-25)


### Bug Fixes

* **tslint:** do not check js files with tslint ([f41b01f](https://github.com/liangchunn/typescript-node-scripts/commit/f41b01f633cd7c5a067eba40464cac25a364f868))



## [1.0.2](https://github.com/liangchunn/typescript-node-scripts/compare/v0.5.0...v1.0.2) (2018-09-16)


### Bug Fixes

* **codeframe:** use default export ([4aad562](https://github.com/liangchunn/typescript-node-scripts/commit/4aad56290ed59000acc71e05eef3c0e465dd9184))
* **ts-jest:** use node module resolution ([531d8fd](https://github.com/liangchunn/typescript-node-scripts/commit/531d8fdf7650f9c14af96f08ba427589257e0ac2))


### Features

* **babel:** full support, sink tests, fix warnings ([069a7ff](https://github.com/liangchunn/typescript-node-scripts/commit/069a7ff7cbbd7dad047e935d80a184a85efb9784))
* **babel:** use babel for js files ([838a12c](https://github.com/liangchunn/typescript-node-scripts/commit/838a12c7d6c2ce75e02daab7a74d4df553c826ad))



# [0.5.0](https://github.com/liangchunn/typescript-node-scripts/compare/v0.4.4...v0.5.0) (2018-08-08)


### Bug Fixes

* **package:** update fork-ts-checker-webpack-plugin to version 0.4.4 ([1a0d5fc](https://github.com/liangchunn/typescript-node-scripts/commit/1a0d5fc486424784466dcfd1aade5e93ff00d9cd))
* **package:** update ts-jest to version 23.1.3 ([08fe6f5](https://github.com/liangchunn/typescript-node-scripts/commit/08fe6f5055c934d094c3184cac5965846e024481)), closes [#12](https://github.com/liangchunn/typescript-node-scripts/issues/12)
* **package:** update webpack to version 4.16.5 ([164efcc](https://github.com/liangchunn/typescript-node-scripts/commit/164efcc56bf052fd6e9b7377f851f0c974058531)), closes [#10](https://github.com/liangchunn/typescript-node-scripts/issues/10)


### Features

* **typescript:** v3 + use experimentalWatchApi in webpack ([83a9ad2](https://github.com/liangchunn/typescript-node-scripts/commit/83a9ad20747d398c20b2491a1bc80db0378feb1b))



## [0.4.4](https://github.com/liangchunn/typescript-node-scripts/compare/v0.4.2...v0.4.4) (2018-08-01)


### Bug Fixes

* **package:** update webpack to version 4.16.2 ([fe44509](https://github.com/liangchunn/typescript-node-scripts/commit/fe44509272ca93958114a999d65882f56ba73bef))


### Features

* **jest:** target only commonjs ([930f5ca](https://github.com/liangchunn/typescript-node-scripts/commit/930f5cade6faf8bb188231a7d9bd23080b9214f0))



## [0.4.2](https://github.com/liangchunn/typescript-node-scripts/compare/v0.4.1...v0.4.2) (2018-07-23)



## [0.4.1](https://github.com/liangchunn/typescript-node-scripts/compare/v0.4.0...v0.4.1) (2018-07-23)



# [0.4.0](https://github.com/liangchunn/typescript-node-scripts/compare/v0.3.0...v0.4.0) (2018-07-21)



# [0.3.0](https://github.com/liangchunn/typescript-node-scripts/compare/v0.2.4...v0.3.0) (2018-07-20)



## [0.2.4](https://github.com/liangchunn/typescript-node-scripts/compare/v0.2.2...v0.2.4) (2018-07-17)



## [0.2.2](https://github.com/liangchunn/typescript-node-scripts/compare/v0.2.1...v0.2.2) (2018-06-15)



## 0.2.1 (2018-06-15)



