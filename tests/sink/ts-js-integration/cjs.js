// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

module.exports = {
  TEST: 2,
  default: () => 1,
  readFileSync: fs.readFileSync
};
