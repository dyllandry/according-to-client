/**
 * Creates a fetch Request object for a GraphQL request.
 * @param {string} query GraphQL query string
 * @param {string} [url] Url for GraphQL endpoint. If omitted, set to
 * REACT_APP_GRAPHQL_ENDPOINT environment variable.
 * @returns {Request} Request object
 */
export function GraphQLRequest (
  query: string,
  {
    variables,
    graphQLEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || ''
  }: {
    variables?: object
    graphQLEndpoint?: string
  } = {}
): Request {
  return new Request(graphQLEndpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })
}

/**
 * GraphQL query strings for the according-to api 
 */
export const GraphQLQueries = {
  getTags: `{
    tags {
      _id
      name
      weight
    }
  }`,
  getPostSummaries: `{
    posts {
      _id
      title
      description
      author {
        displayName
      }
      createdAt
      tags {
        name
      }
    }
  }
  `,
  getPostById: `query getPostById($id: ID!) {
    post(id: $id) {
      id
      title
      description
      body
      author {
        id
        displayName
      }
      tags {
        id
        name
      }
      createdAt
    }
  }`
}
