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
  createdAt: number
  cover: Cover | null
  coverAlt: string
}

export interface Cover {
  provider: string
  url: string
}

export interface PostSummary {
  id: string
  title: string
  description: string
  createdAt: number
  tags: Tag[]
  author: Author
  cover: Cover | null
  coverAlt: string
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
    id: getUid(),
    title: 'Fake Post',
    description: 'Description of a fake post.',
    createdAt: Date.now(),
    tags: [getFakeTag()],
    author: getFakeAuthor(),
    cover: getFakeCover(),
    coverAlt: 'fake cover alt'
  }
}

/**
 * Helper creates a fake post.
 * @returns {Post}
 */
export function getFakePost ({
  id = getUid(),
  cover = getFakeCover()
} : {
  id?: string,
  cover?: Cover
} = {}): Post {
  return {
    id,
    title: 'Fake Post',
    description: 'Description of fake post.',
    body: 'Body of fake post.',
    author: getFakeAuthor(),
    tags: [getFakeTag()],
    createdAt: Date.now(),
    cover,
    coverAlt: 'Fake cover alt.'
  }
}

/**
 * Helper creates a fake cover.
 * returns {Cover}
 */
export function getFakeCover({
  url = 'http://fakeUrl.com',
  provider = 'fake provider'
} = {}) {
  return {
    url,
    provider
  }
}
