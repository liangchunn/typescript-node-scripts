#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

# test if in docker environment
# this script should only be running in docker!
if [ -f /.dockerenv ] || [ -n "${TRAVIS}" ] ; then
  echo "Detected script running in Docker or Travis CI."
else
  echo "ERR! This script is intended to be used inside Docker only."
  echo "ERR! Run 'yarn e2e:local' instead."
  exit 1
fi

# start in the directory where the script runs
cd $SCRIPT_DIR

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

#==============================#
# Test development environment #
#==============================#
# lint project
yarn lint
# test templates
yarn build
# check for local build files
exists template/dist/*.js
CI=true yarn test

# bump version so that we can 'deploy' to verdaccio
npm version patch --force
# publish to verdaccio
npm publish

#================================#
# Test end user install from npm #
#================================#
# simulate end user installs
cd $TEMP_APP_PATH
npx typescript-node-scripts create test-app

cd test-app
exists node_modules/typescript-node-scripts

#========================#
# Test generated project #
#========================#
# run tslint on generated project
yarn lint
# build
yarn build
# check for build files
exists dist/*.js
CI=true yarn test

#=================================================#
# Run sink/ts-js-integration in generated project #
#=================================================#
# remove src folder
rm -rf src/*
# copy the ts-js-integration files to src
cp -a "$SCRIPT_DIR/sink/ts-js-integration/." ./src
# run the build and execute the bundle
yarn build
node dist/bundle.prod.js
# run the test files
CI=true yarn test