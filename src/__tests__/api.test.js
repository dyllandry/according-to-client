import { 
  GraphQLRequest
 } from '../api'
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()

describe('api', () => {
  
  describe('GraphQLRequest()', () => {
  
    describe('returned request', () => {

      it('contains passed url', () => {
        const expected = 'http://url'
        const graphQLGetRequest = GraphQLRequest('{ posts }', expected)
        
        graphQLGetRequest.url.should.equal(expected)
      })
      
      it('contains passed query in POST body', async () => {
        const request = GraphQLRequest('{ posts }')
        const bodyJson = await request.json()
        bodyJson.query.should.equal('{ posts }')
      })

      it('contains application/json Content-Type header', () => {
        const request = GraphQLRequest('{ posts }')
        request.headers.get('Content-Type').should.equal('application/json')
      })

      it('contains POST http method', () => {
        const request = GraphQLRequest('{ posts }')
        request.method.should.equal('POST')
      })

    })

  })

})
