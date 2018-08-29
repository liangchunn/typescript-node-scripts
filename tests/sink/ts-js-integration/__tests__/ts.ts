import * as tsRelative from '../ts'
import * as tsAbsolute from '~/ts'

describe('ts: absolute imports', () => {
    it('exports variables', () => {
        expect(typeof tsRelative.TEST === 'number').toBe(true)
    })
    it('exports default', () => {
        expect(typeof tsRelative.default === 'function').toBe(true)
    })
})

describe('ts: relative imports', () => {
    it('exports variables', () => {
        expect(typeof tsAbsolute.TEST === 'number').toBe(true)
    })
    it('exports default', () => {
        expect(typeof tsAbsolute.default === 'function').toBe(true)
    })
})
