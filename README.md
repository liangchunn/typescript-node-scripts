# typescript-node-scripts

[![Build Status](https://travis-ci.com/liangchunn/typescript-node-scripts.svg?branch=master)](https://travis-ci.com/liangchunn/typescript-node-scripts) [![npm](https://img.shields.io/npm/v/typescript-node-scripts.svg)](https://www.npmjs.com/package/typescript-node-scripts) [![npm](https://img.shields.io/npm/dt/typescript-node-scripts.svg)](https://www.npmjs.com/package/typescript-node-scripts) [![install size](https://packagephobia.now.sh/badge?p=typescript-node-scripts)](https://packagephobia.now.sh/result?p=typescript-node-scripts) [![Greenkeeper badge](https://badges.greenkeeper.io/liangchunn/typescript-node-scripts.svg)](https://greenkeeper.io/) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=liangchunn_typescript-node-scripts&metric=alert_status)](https://sonarcloud.io/dashboard?id=liangchunn_typescript-node-scripts)


Create Node.js applications based on TypeScript with zero-configuration.

<p align="center">
    <img 
    width="600" src="https://cdn.rawgit.com/liangchunn/typescript-node-scripts/12e1600/.resources/term.svg"/>
</p>

Inspired by `create-react-app` and Dan Abramov's [The Melting Pot of JavaScript](https://increment.com/development/the-melting-pot-of-javascript/).

- Supports testing, building, and development in watch mode
- Supports custom TypeScript path mappings, aka `compilerOptions.path`

## Quick Start Guide

```sh
npx typescript-node-scripts create <appName>
cd <appName>
yarn start
```

## Requirements

- node `>=8.0.0`
- `process.platform !== 'win32'`

## Documentation

Access the documentation here: https://liangchunn.github.io/typescript-node-scripts