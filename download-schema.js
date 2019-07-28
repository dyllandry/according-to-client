const { exec } = require('child_process')
const { resolve } = require('path')
require('dotenv').config()

const getGraphqlSchemaPath = resolve(__dirname, 'node_modules', 'get-graphql-schema', 'dist', 'index.js')
const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT
const fileName = 'schema.graphql'

if (!endpoint) {
  throw Error('Prior to testing this application, a fresh GraphQL schema is downloaded from the GraphQL server to test the validity of queries. As such, the REACT_APP_GRAPHQL_ENDPOINT environment variable must be set.')
}

exec(`${getGraphqlSchemaPath} ${endpoint} > ${fileName}`, (error) => {
  if (error) {
    console.error(`Error downloading GraphQL schema: ${error}`);
    process.exit(1)
  }
  console.log(`GraphQL schema updated from ${endpoint} and saved to ${resolve(__dirname, fileName)}`)
  process.exit(0)
})
