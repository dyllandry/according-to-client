/**
 * Gets a unique id of 10 base64 characters. Does not check for uniqueness,
 * depends on the miniscule change that generated id would ever be duplicates.
 * @returns {string} The random uid.
 */
export default function getUid() {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let uid = ''
  for (let i = 0; i < 10; i++) {
    uid += base64Chars[Math.floor(Math.random() * base64Chars.length)];
  }
  return uid
}
