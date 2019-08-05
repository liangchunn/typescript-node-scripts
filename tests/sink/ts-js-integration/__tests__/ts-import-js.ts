import * as cjs from "../cjs";
import cjsDefault, {
    readFileSync as CJS_READ_FILE_SYNC,
    TEST as CJS_TEST,
} from "../cjs";
import * as esm from "../esm";
import esmDefault, {
    readFileSync as ESM_READ_FILE_SYNC,
    TEST as ESM_TEST,
} from "../cjs";

describe("importing js from ts", () => {
    describe("cjs", () => {
        it("can import named exports", () => {
            expect(typeof cjsDefault === "function").toBe(true);
            expect(typeof CJS_READ_FILE_SYNC === "function").toBe(true);
            expect(typeof CJS_TEST === "number").toBe(true);
        });
        it("can import star imports", () => {
            expect(typeof cjs.default === "function").toBe(true);
            expect(typeof cjs.readFileSync === "function").toBe(true);
            expect(typeof cjs.TEST === "number").toBe(true);
        });
    });
    describe("esm", () => {
        it("can import named exports", () => {
            expect(typeof esmDefault === "function").toBe(true);
            expect(typeof ESM_READ_FILE_SYNC === "function").toBe(true);
            expect(typeof ESM_TEST === "number").toBe(true);
        });
        it("can import star imports", () => {
            expect(typeof esm.default === "function").toBe(true);
            expect(typeof esm.readFileSync === "function").toBe(true);
            expect(typeof esm.TEST === "number").toBe(true);
        });
    });
});