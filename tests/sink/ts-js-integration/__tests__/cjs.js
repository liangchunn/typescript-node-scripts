import cjs from '../cjs'
import cjsNonDefault, { TEST } from '../cjs'

describe('cjs', () => {
    it('can import star exports', () => {
        expect(typeof cjs.TEST === 'number').toBe(true)
        expect(typeof cjs.default === 'function').toBe(true)
    })
    it('can import named exports', () => {
        expect(typeof TEST === 'number').toBe(true)
        expect(typeof cjsNonDefault.default === 'function').toBe(true)
    })
})
