import React from 'react'
import { render, wait } from '@testing-library/react'
import AuthorImage from '../AuthorImage'
import { getAuthorPictureAltText } from '../../getAuthorPictureAltText'
import { getFakeAuthor } from '../../models/Author';

describe('AuthorImage component', () => {

  it('renders without crashing', () => {
    render(<AuthorImage />)    
  })

  it('renders author image alt text', async () => {
    const fakeAuthor = getFakeAuthor()
    const expected = getAuthorPictureAltText(fakeAuthor.displayName)
    const { getByAltText } = render(<AuthorImage 
      name={fakeAuthor.displayName} 
      src={fakeAuthor.picture.url}
    />)
    await wait(() => getByAltText(expected))
    expect(getByAltText(expected)).toBeVisible()
  })
  
})
