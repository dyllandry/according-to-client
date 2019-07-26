import React from 'react'
import Home from '../Home'
import { render } from '@testing-library/react'

describe('home component', () => {
  
  it('renders without crashing', () => {
    render(<Home />)
  })

  it('renders trending tags', () => {
    const { getByTestId } = render(<Home />)
    expect(getByTestId('trending-tags')).toBeVisible()
  })

  it('renders feed', () => {
    const { getByTestId } = render(<Home />)
    expect(getByTestId('feed')).toBeVisible()
  })
  
})
