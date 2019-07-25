import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <header>
          <h1>
            <Link to='/' data-testid='site-title-link'>
              {process.env.REACT_APP_SITE_TITLE}
            </Link>
          </h1>
      </header>
    )
  }
}
