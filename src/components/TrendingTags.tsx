import React, { Component } from 'react'
import { Tag, getTags } from '../models/Tag';

interface Props {}

interface State {
  tags: Tag[]
}

export default class TrendingTags extends Component <Props, State> {
  
  constructor (props: Props) {
    super(props)
    this.state = {
      tags: []
    }
  } 

  async componentDidMount () {
    this.setState({ tags: await getTags()})
  }

  render() {
    return (
      <div>
        <ol>
          { this.state.tags.map(tag => {
            return <li key={tag._id}>#{ tag.name }</li>
          })}
        </ol>  
      </div>
    )
  }
  
}
