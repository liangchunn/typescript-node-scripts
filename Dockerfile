FROM node:8.15.0
WORKDIR /usr/src/typescript-node-scripts
COPY . .
CMD ["./tests/e2e.sh"]