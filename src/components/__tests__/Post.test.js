import React from 'react'
import { stub } from 'sinon'
import { render, wait, waitForElementToBeRemoved, waitForDomChange } from '@testing-library/react'
import * as PostModel from '../../models/Post'
import Post from '../Post'
import showdown from 'showdown'

const converter = new showdown.Converter()

describe('post component', () => {

  const getPostByIdStub = stub(PostModel, 'getPostById')
  const fakePost = PostModel.getFakePost('123')

  beforeEach(() => {
    getPostByIdStub.resolves(null)
  })

  it('renders without crashing', () => {
    render(<Post />)
  })
  
  it('renders loading message when loading post', () => {
    const { getByTestId } = render(<Post />)
    expect(getByTestId('post-loading-message')).toBeVisible()
  })

  it('hides loading message when not loading post', async () => {
    const { getByTestId } = render(<Post />)
    await waitForElementToBeRemoved(() => getByTestId('post-loading-message'))
  })

  it('renders message when post loading failed', async () => {
    const { getByTestId } = render (<Post />)
    await wait(() => getByTestId('post-loading-failed'))
    expect(getByTestId('post-loading-failed')).toBeVisible()
  })

  it('renders post title', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByTestId } = render(<Post id='123'/>)
    await wait(() => getByTestId('post-title'))
    expect(getByTestId('post-title')).toBeVisible()
    expect(getByTestId('post-title')).toHaveTextContent(fakePost.title)
  })

  it('renders post description', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByTestId } = render(<Post id='123'/>)
    await wait(() => getByTestId('post-description'))
    expect(getByTestId('post-description')).toBeVisible()
    expect(getByTestId('post-description')).toHaveTextContent(fakePost.description)
  })

  it('renders post body', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByTestId } = render(<Post id='123'/>)
    await wait(() => getByTestId('post-body'))
    expect(getByTestId('post-body')).toBeVisible()
    waitForDomChange({ container: getByTestId('post-body') }).then(() => {
      expect(getByTestId('post-body')).toHaveTextContent(converter.makeHtml(fakePost.body))
    })
  })

  it('renders post author', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByText } = render(<Post />)
    await wait(() => getByText(fakePost.title))
    expect(getByText(fakePost.author.displayName, {
      exact: false
    })).toBeVisible()
  })

  it('renders post tags', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByText } = render(<Post />)
    await wait(() => getByText(fakePost.title))
    fakePost.tags.forEach(tag => {
      expect(getByText(tag.name, {
        exact: false
      })).toBeVisible()
    })
  })

  it('renders post date', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByText } = render(<Post />)
    await wait(() => getByText(fakePost.title))
    const postDate = new Date(fakePost.createdAt)
    const dayMonthYear = `${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`
    expect(getByText(dayMonthYear, { exact: false })).toBeVisible()
  })

  it('renders post cover alt text', async () => {
    getPostByIdStub.resolves(fakePost)
    const { getByAltText } = render(<Post />)
    await wait(() => getByAltText(fakePost.coverAlt))
    expect(getByAltText(fakePost.coverAlt)).toBeVisible()
  })
  
})
