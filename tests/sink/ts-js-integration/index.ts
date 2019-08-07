import * as assert from "assert";
import * as cjs from "./cjs";
import esmDefault, {
    readFileSync as ESM_READ_FILE_SYNC,
    TEST as ESM_TEST,
} from "./cjs";
import cjsDefault, {
    readFileSync as CJS_READ_FILE_SYNC,
    TEST as CJS_TEST,
} from "./cjs";
import * as esm from "./esm";

assert(typeof cjsDefault === "function");
assert(typeof CJS_READ_FILE_SYNC === "function");
assert(typeof CJS_TEST === "number");
assert(typeof cjs.default === "function");
assert(typeof cjs.readFileSync === "function");
assert(typeof cjs.TEST === "number");
assert(typeof esmDefault === "function");
assert(typeof ESM_READ_FILE_SYNC === "function");
assert(typeof ESM_TEST === "number");
assert(typeof esm.default === "function");
assert(typeof esm.readFileSync === "function");
assert(typeof esm.TEST === "number");
