import React from 'react'
import { render, wait } from '@testing-library/react'
import Feed from '../Feed';
import sinon, { fake, replace } from 'sinon'
import * as post from '../../models/Post'
import { renderWithRouter } from '../../test-utilities';

describe('feed component', () => {

  beforeEach(() => {
    sinon.restore()
  })

  it('renders without crashing', () => {
    renderWithRouter(<Feed />)
  })

  it('renders feed aria-label', () => {
    const { getByLabelText } = renderWithRouter(<Feed />)
    expect(getByLabelText('feed')).toBeVisible()
  })

  it('displays loading posts message at start', () => {
    const { getByTestId } = renderWithRouter(<Feed />)
    expect(getByTestId('feed-loading-message')).toBeVisible()
  })

  it('displays message when there\'s no posts to display', async () => {
    const getPostSummariesFake = fake.resolves([])
    replace(post, 'getPostSummaries', getPostSummariesFake)
    const { getByTestId } = renderWithRouter(<Feed />)
    await wait(() => getByTestId('feed-no-posts-to-display'))
    expect(getByTestId('feed-no-posts-to-display')).toBeVisible()
  })

  it('displays list of posts summaries when they exist', async () => {
    const getPostSummariesFake = fake.resolves([post.getFakePostSummary()])
    replace(post, 'getPostSummaries', getPostSummariesFake)
    const { getByTestId } = renderWithRouter(<Feed />)
    await wait(() => getByTestId('feed-post-summaries-list'))
    expect(getByTestId('feed-post-summaries-list')).toBeVisible()
  })
  
})
