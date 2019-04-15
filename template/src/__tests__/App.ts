import App from "~/App";

describe("test", () => {
  it("runs", () => {
    expect(1).toEqual(1);
  });
  it("default of App export is a function", () => {
    expect(typeof App === "function").toBe(true);
  });
});
