FROM node:8.11.3
WORKDIR /usr/src/typescript-node-scripts
COPY . .
CMD ["./tests/e2e.sh"]