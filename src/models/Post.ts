import { 
  GraphQLRequest,
  GraphQLQueries 
} from '../api'

import { Tag } from './Tag';
import { Author } from './Author';

interface PostSummary {
  title: string
  description: string
  createdAt: number
  tags: Tag[]
  Author: Author
}

/**
 * Helper for requesting post summaries.
 * @returns {PostSummary[]} Array of post summaries.
 */
export async function getPostSummaries (): Promise<PostSummary[]> {
  // NOTE: Not testing, only implementation details.
  const request = GraphQLRequest(GraphQLQueries.getPostSummaries)
  const response = await fetch(request)
  const json = await response.json()
  return json.data.posts
}
