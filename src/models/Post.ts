import { 
  GraphQLRequest,
  GraphQLQueries 
} from '../api'

import { Tag, getFakeTag } from './Tag';
import { Author, getFakeAuthor } from './Author';
import getUid from '../uid';

export interface Post {
  id: string
  title: string
  description: string
  body: string
  author: Author
  tags: Tag[]
  createdAt: string
}

export interface PostSummary {
  _id: string
  title: string
  description: string
  createdAt: number
  tags: Tag[]
  Author: Author
}

/**
 * Helper for requesting a post.
 * @param {string} id Id to get post by.
 * @returns {Post} A post.
 */
export async function getPostById (id: string): Promise<Post> {
  // NOTE: Not testing, only implementation details.
  const request = GraphQLRequest(
    GraphQLQueries.getPostById, 
    { variables: { id } }
  )
  const response = await fetch(request)
  const json = await response.json()
  return json.data.post
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

/**
 * Helper that creates a fake post summary.
 * @returns {PostSummary} A fake post summary.
 */
export function getFakePostSummary (): PostSummary {
  return {
    _id: getUid(),
    title: 'Fake Post',
    description: 'Description of a fake post.',
    createdAt: Date.now(),
    tags: [getFakeTag()],
    Author: getFakeAuthor()
  }
}
