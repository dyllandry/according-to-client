import React from 'react'
import { fireEvent } from '@testing-library/react'
import Header from '../Header';
import { renderWithRouter } from '../../test-utilities'
import { Route } from 'react-router';
import Feed from '../Feed'
require('dotenv').config()

describe('header component', () => {

  it('renders without crashing', () => {
    renderWithRouter(<Header />)
  })

  
  describe('site title', () => {
    
    it('renders text', () => {
      const { getByText } = renderWithRouter(<Header />)
      expect(getByText(process.env.REACT_APP_SITE_TITLE)).toBeVisible()
    })

    it('navigates to feed when clicked', () => {
      const { getByLabelText, getByText } = renderWithRouter(
        <div>
          <Header />
          <Route path='/' exact component={Feed} />
        </div>,
        { route: '/not-home'}
      )
      const leftClick = { button: 0 }
      fireEvent.click(getByText(process.env.REACT_APP_SITE_TITLE), leftClick)
      expect(getByLabelText('feed')).toBeVisible()
    })
    
  })
  
})
