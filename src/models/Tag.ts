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
  // NOTE: Not testing, only implementation details.
  const request = GraphQLRequest(GraphQLQueries.getTags)
  const response = await fetch(request)
  const json = await response.json()
  return json.data.tags
}
