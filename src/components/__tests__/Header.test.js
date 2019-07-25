import React from 'react'
import { fireEvent } from '@testing-library/react'
import Header from '../Header';
import { renderWithRouter } from '../../test-utilities'
import { Route } from 'react-router';
import Home from '../Home'

describe('header component', () => {

  it('renders without crashing', () => {
    renderWithRouter(<Header />)
  })

  
  describe('site title', () => {
    
    it('renders text', () => {
      const { getByText } = renderWithRouter(<Header />)
      expect(getByText(process.env.REACT_APP_SITE_TITLE)).toBeVisible()
    })

    it('navigates to home when clicked', () => {
      const { getByTestId } = renderWithRouter(
        <div>
          <Header />
          <Route path='/' exact component={Home} />
        </div>,
        { route: '/not-home'}
      )
      const leftClick = { button: 0 }
      fireEvent.click(getByTestId('site-title-link'), leftClick)
      expect(getByTestId('trending-tags')).toBeVisible()
    })
    
  })
  
})
