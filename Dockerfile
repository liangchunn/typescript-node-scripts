FROM node:10
WORKDIR /usr/src/typescript-node-scripts
COPY . .
CMD ["./tests/e2e.sh"]