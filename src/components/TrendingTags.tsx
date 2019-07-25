import React, { Component } from 'react'
import { Tag, getTags } from '../models/Tag';

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
      <div>
        <ol>
          { this.state.tags.map(tag => {
            return <li key={tag._id}>{`#${tag.name}`}</li>
          })}
        </ol>  
      </div>
    )
  }
  
}
