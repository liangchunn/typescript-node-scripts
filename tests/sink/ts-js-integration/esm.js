import fs from "fs";

export const readFileSync = fs.readFileSync;
export const TEST = 2;
export default () => {
  // eslint-disable-next-line
  console.log('App is running');
};
