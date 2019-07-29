import React from 'react'
import { fireEvent, wait } from '@testing-library/react'
import PostSummary from '../PostSummary'
import { getFakePostSummary, getFakePost } from '../../models/Post';
import { renderWithRouter } from '../../test-utilities';
import Post from '../Post'
import { Route } from 'react-router-dom'
import { stub } from 'sinon'
import * as PostModel from '../../models/Post'

describe('post summary component', () => {

  it('renders without crashing', () => {
    renderWithRouter(<PostSummary />)
  })

  it('renders post description', () => {
    const fakePostSummary = getFakePostSummary()
    const { getByTestId } = renderWithRouter(<PostSummary {...fakePostSummary} />)
    expect(getByTestId('post-summary-description')).toBeVisible()
    expect(getByTestId('post-summary-description'))
      .toHaveTextContent(fakePostSummary.description)
  })

  describe('the post title', () => {

    it('renders post title', () => {
      const fakePostSummary = getFakePostSummary()
      const { getByTestId } = renderWithRouter(<PostSummary {...fakePostSummary} />)
      expect(getByTestId('post-summary-title')).toBeVisible()
      expect(getByTestId('post-summary-title'))
        .toHaveTextContent(fakePostSummary.title)
    })

    it('navigates to the post when clicked', async () => {
      const fakePostSummary = getFakePostSummary()
      const fakePost = getFakePost()
      const getPostByIdStub = stub(PostModel, 'getPostById')
      getPostByIdStub.resolves(fakePost)

      const { getByTestId } = renderWithRouter(
        <div>
          <PostSummary {...fakePostSummary} />
          <Route 
            path='/post/:id' 
            render={({ match }) => {
              return <Post id={match.params.id} /> 
            }} 
          />
        </div>
      )
      const leftClick = { button: 0 }
      fireEvent.click(getByTestId('post-summary-link'), leftClick)
      await wait(() => getByTestId('post-title'))
      expect(getByTestId('post-title')).toBeVisible()
    })

    it('renders post cover alt text', () => {
      const fakePostSummary = getFakePostSummary()
      const { getByAltText } = renderWithRouter(<PostSummary {...fakePostSummary} />)
      expect(getByAltText(fakePostSummary.coverAlt)).toBeVisible()
    })

  })
  
})
