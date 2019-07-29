export interface Author {
  displayName: string
  picture: Picture
}

export interface Picture {
  url: string,
  provider: string
}

/**
 * Helper that creates a fake author.
 * @returns {Author} The fake author.
 */
export function getFakeAuthor () {
  return {
    displayName: 'Dylan Landry',
    picture: {
      url: 'http://fakeurl.com',
      provider: 'local'
    }
  }
}
