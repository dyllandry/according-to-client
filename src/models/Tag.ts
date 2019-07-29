import { 
  GraphQLRequest,
  GraphQLQueries
} from '../api'
import getUid from '../uid';

export interface Tag {
  id: string
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

/**
 * Helper that creates a fake tag.
 * @returns {Tag} The fake tag.
 */
export function getFakeTag () {
  const uid = getUid()
  return {
    id: uid,
    name: `Fake Tag ${uid}`,
    weight: 1
  }
}
