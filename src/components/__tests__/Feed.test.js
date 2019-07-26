import React from 'react'
import { render, wait } from '@testing-library/react'
import Feed from '../Feed';
import sinon, { fake, replace } from 'sinon'
import * as post from '../../models/Post'

describe('feed component', () => {

  beforeEach(() => {
    sinon.restore()
  })

  it('renders without crashing', () => {
    render(<Feed />)
  })

  it('renders feed header', () => {
    const { getByTestId } = render(<Feed />)
    expect(getByTestId('feed-header')).toBeVisible()
  })

  it('displays loading posts message at start', () => {
    const { getByTestId } = render(<Feed />)
    expect(getByTestId('feed-loading-message')).toBeVisible()
  })

  it('displays message when there\'s no posts to display', async () => {
    const getPostSummariesFake = fake.resolves([])
    replace(post, 'getPostSummaries', getPostSummariesFake)
    const { getByTestId } = render(<Feed />)
    await wait(() => getByTestId('feed-no-posts-to-display'))
    expect(getByTestId('feed-no-posts-to-display')).toBeVisible()
  })

  it('displays list of posts summaries when they exist', async () => {
    const getPostSummariesFake = fake.resolves([post.getFakePostSummary()])
    replace(post, 'getPostSummaries', getPostSummariesFake)
    const { getByTestId } = render(<Feed />)
    await wait(() => getByTestId('feed-post-summaries-list'))
    expect(getByTestId('feed-post-summaries-list')).toBeVisible()
  })
  
})