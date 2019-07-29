import React, { Component } from 'react'
import { Tag, getTags } from '../models/Tag';
import styles from './TrendingTags.module.css'

interface Props {}

interface State {
  tags: Tag[]
}

export default class TrendingTags extends Component <Props, State> {
  
  _isMounted = false

  constructor (props: Props) {
    super(props)
    this.state = {
      tags: []
    }
  } 

  async componentDidMount () {
    this._isMounted = true
    const tags = await getTags()
    if (this._isMounted === true) { 
      this.setState({ tags })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render() {
    return (
      <div className={styles['trending-tags']} data-testid='trending-tags'>
        <h2 className={styles.header}>Trending</h2>
        <ol className={styles.list}>
          { this.state.tags.map(tag => {
            return (
              <li key={tag.id} className={styles.tag}>
                <span className={styles.hash}>#</span>
                <span>{`${tag.name}`}</span>
              </li>
            )
          })}
        </ol>  
      </div>
    )
  }
  
}
