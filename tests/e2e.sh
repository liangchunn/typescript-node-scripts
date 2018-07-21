#!/bin/bash

# test if in docker environment
# this script should only be running in docker!
if [ -f /.dockerenv ]; then
  echo "Detected script running in Docker."
else
  echo "ERR! This script is intended to be used inside Docker only."
  echo "ERR! Run 'yarn e2e:local' instead."
  exit 1
fi

# start in tests/ dir
cd "$(dirname "$0")"

TEMP_APP_PATH=`mktemp -d`
VERDACCIO_REGISTRY_URL=http://localhost:4873

function exists {
  for f in $*; do
    test -e "$f"
  done
}

# exit if any command fails
set -e
# echo every command being executed
set -x

# go back to root directory
cd ..

# update npm
npm i -g npm@latest

# install deps
yarn

# start verdaccio
VERDACCIO_REGISTRY_LOGS=`mktemp`
nohup npx verdaccio@3.2.0 -c tests/verdaccio.yml &>$VERDACCIO_REGISTRY_LOGS &
# wait for verdaccio to boot
grep -q 'http address' <(tail -f $VERDACCIO_REGISTRY_LOGS)

# set registry to verdaccio registry
npm set registry "$VERDACCIO_REGISTRY_URL"
yarn config set registry "$VERDACCIO_REGISTRY_URL"

# login to custom registy
(cd && npx npm-auth-to-token@1.0.0 -u user -p password -e user@example.com -r "$VERDACCIO_REGISTRY_URL")

# test templates
yarn build
# check for local build files
exists template/dist/*.js
CI=true yarn test

# bump version
npm version patch
# publish to verdaccio
npm publish

# simulate end user installs
cd $TEMP_APP_PATH
npx typescript-node-scripts create test-app

cd test-app
exists node_modules/typescript-node-scripts
yarn build
# check for build files
exists dist/*.js
CI=true yarn test
