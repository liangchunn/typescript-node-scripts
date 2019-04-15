import * as esm from '../esm'
import esmDefault, { TEST } from '../esm'

describe('esm', () => {
  it('can import star exports', () => {
    expect(typeof esm.TEST === 'number').toBe(true)
    expect(typeof esm.default === 'function').toBe(true)
  })
  it('can import named exports', () => {
    expect(typeof TEST === 'number').toBe(true)
    expect(typeof esmDefault === 'function').toBe(true)
  })
})
