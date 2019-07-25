import { 
  GraphQLRequest,
  GraphQLQueries
} from '../api'

export interface Tag {
  _id: string
  name: string
  weight: number
}

/**
 * Helper for requesting tags.
 * @returns {Tag[]} Array of tags.
 */
export async function getTags(): Promise<Tag[]> {
  // NOTE: Unsure of how to test this method without soley testing implementation
  // details. Additionally, GraphQLRequest is already tested and fetch is assumed
  // to be stable. The only operation besides is that the getTags GraphQLQuery was
  // passed to GraphQLRequest. Though, if that implementation detail changes, I
  // don't want the test to fail.
  const request = GraphQLRequest(GraphQLQueries.getTags)
  const response = await fetch(request)
  const json = await response.json()
  return json.data.tags
}
