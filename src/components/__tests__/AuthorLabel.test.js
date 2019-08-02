import React from 'react'
import { render, wait } from '@testing-library/react'
import AuthorLabel from '../AuthorLabel'
import { getFakeAuthor } from '../../models/Author';

describe('AuthorImageLabel', () => {

  it('renders without crashing', () => {
    render(<AuthorLabel />)
  })

  it('renders author\'s name', async () => {
    const fakeAuthor = getFakeAuthor()
    const { getByText } = render(<AuthorLabel 
      name={fakeAuthor.displayName}
      imageUrl={fakeAuthor.picture.url}
      imageProvider={fakeAuthor.picture.provider}
    />)
    await wait(() => getByText(fakeAuthor.displayName))
    expect(getByText(fakeAuthor.displayName)).toBeVisible()
  })

})
