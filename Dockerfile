FROM node:12
WORKDIR /usr/src/typescript-node-scripts
COPY . .
CMD ["./tests/e2e.sh"]