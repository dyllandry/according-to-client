import { getLocalProviderImageUrl } from '../getProviderImageUrl'
const should = require('chai').should()

describe('getProviderImgUrl', () => {
  
  it('returns valid local image provider url', () => {
    const hostname = 'http://abc.com'
    const path = '/images/1234.img'
    const expected = hostname + path
    const actual = getLocalProviderImageUrl(hostname, path)
    actual.should.equal(expected)
  })

})
