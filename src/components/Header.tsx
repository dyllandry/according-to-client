import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import TrendingTags from './TrendingTags';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles['noscroll-container']}>
          <h1 className={styles['site-title']}>
            <Link to='/' data-testid='site-title-link'>
              <span>{process.env.REACT_APP_SITE_TITLE}</span>
              <span role="img" className={styles.globe} aria-label="Globe">🌎</span>
            </Link>
          </h1>
          <TrendingTags />
        </div>
      </header>
    )
  }
}
