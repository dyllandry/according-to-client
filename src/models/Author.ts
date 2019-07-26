export interface Author {
  displayName: string
}

/**
 * Helper that creates a fake author.
 * @returns {Author} The fake author.
 */
export function getFakeAuthor () {
  return {
    displayName: 'Dylan Landry'
  }
}
