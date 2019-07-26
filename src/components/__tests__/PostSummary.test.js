import React from 'react'
import { render } from '@testing-library/react'
import PostSummary from '../PostSummary'
import { getFakePostSummary } from '../../models/Post';

describe('post summary component', () => {

  it('renders without crashing', () => {
    render(<PostSummary />)
  })

  it('renders post title', () => {
    const fakePostSummary = getFakePostSummary()
    const { getByTestId } = render(<PostSummary {...fakePostSummary} />)
    expect(getByTestId('post-summary-title')).toBeVisible()
    expect(getByTestId('post-summary-title'))
      .toHaveTextContent(fakePostSummary.title)
  })

  it('renders post description', () => {
    const fakePostSummary = getFakePostSummary()
    const { getByTestId } = render(<PostSummary {...fakePostSummary} />)
    expect(getByTestId('post-summary-description')).toBeVisible()
    expect(getByTestId('post-summary-description'))
      .toHaveTextContent(fakePostSummary.description)
  })
  
})
