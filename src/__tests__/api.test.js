import { 
  GraphQLRequest, GraphQLQueries
 } from '../api'
 import fs from 'fs';
 import path from 'path'
 // eslint-disable-next-line no-unused-vars
 const should = require('chai').should()
 
 const schemaPath = path.join(__dirname, '..', '..', 'schema.graphql')
 const schemaFile = fs.readFileSync(schemaPath, 'utf8')
 const EasyGraphQLTester = require('easygraphql-tester')
 const graphQLTester = new EasyGraphQLTester(schemaFile)

describe('api', () => {
  
  describe('GraphQLRequest()', () => {
  
    describe('returned request', () => {

      it('contains passed url', () => {
        const expected = 'http://url'
        const graphQLGetRequest = GraphQLRequest(
          'abc', 
          { graphQLEndpoint: expected }
        )
        graphQLGetRequest.url.should.equal(expected)
      })
      
      it('contains passed query in POST body', async () => {
        const expected = 'abc'
        const request = GraphQLRequest(expected)
        const bodyJson = await request.json()
        bodyJson.query.should.equal(expected)
      })

      it('contains application/json Content-Type header', () => {
        const request = GraphQLRequest('abc')
        request.headers.get('Content-Type').should.equal('application/json')
      })

      it('contains POST http method', () => {
        const request = GraphQLRequest('abc')
        request.method.should.equal('POST')
      })

      it('contains variables in body', async () => {
        const expected = { id: 'abc'}
        const request = GraphQLRequest(
          'query',
          { variables: expected }
        )
        const bodyJson = await request.json()
        bodyJson.variables.should.deep.equal(expected)
      })

    })

  })

  describe('GraphQLQueries', () => {

    it('getTags is valid', () => {
      graphQLTester.test(true, GraphQLQueries.getTags)
    })

    it('getPostSummaries is valid', () => {
      graphQLTester.test(true, GraphQLQueries.getPostSummaries)
    })

    it('getPostId is valid', () => {
      graphQLTester.test(true, GraphQLQueries.getPostById, {
        id: '123'
      })
    })
    
  })

})
