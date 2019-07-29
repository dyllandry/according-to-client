/**
 * Returns alt text for an author's picture based on their name.
 * @param {string} authorDisplayName Author's name.
 */
export function getAuthorPictureAltText (authorDisplayName: string):string {
  return `${authorDisplayName}'s profile picture.`
}
