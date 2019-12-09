---
id: deployment
title: Deploying your App
---

By default, TNS emits a main entrypoint in `dist/bundle.prod.js` which is built through webpack with the command `yarn build`.

TNS **does not bundle `node_modules`!** Therefore when you deploy your application, the dependencies of your application should be installed first by including `package.json` and `yarn.lock`!

> Make sure your runtime dependencies are included under `dependencies` in `package.json` so that they can be installed in the production build

## Docker

### Quick-start guide

Before you deploy your application, make sure you run your build first:

```sh
yarn build
```

Your bundle (and assets if you have overridden your webpack config) will be emitted in the `dist` folder

Create a `Dockerfile` in the your project root with the following contents

```Dockerfile
FROM node:10
WORKDIR /usr/src/app
# copy package and lockfile
COPY package.json yarn.lock /
RUN yarn install --production
COPY dist dist
# expose your app port if you need it
EXPOSE 8081
# run the app
CMD [ "node", "dist/bundle.prod.js" ]
```

Then, build the Docker image with:

```sh
# build and tag the image "my-app"
docker build --tag my-app .
```

Now you can run your Dockerized application:

```
docker run --name my-app my-app
```

### References

- `docker run`: https://docs.docker.com/engine/reference/run/
- `docker build`: https://docs.docker.com/engine/reference/commandline/build/
