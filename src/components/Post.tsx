import React, { Component } from 'react'
import { Post as PostType, getPostById } from '../models/Post'
const showdown = require('showdown')
const converter = new showdown.Converter()

interface Props {
  id: string
}

interface State {
  post: PostType | null,
  loadingPost: boolean
}

export default class Post extends Component<Props, State> {

  _isMounted = false

  constructor (props: Props) {
    super(props)
    this.state = { 
      post: null,
      loadingPost: true
    }
  }

  async componentDidMount () {
    this._isMounted = true
    const post = await getPostById(this.props.id)
    if (this._isMounted === true) {
      this.setState({
        post,
        loadingPost: false
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }
  
  render() {
    if (this.state.loadingPost) {
      return (
        <div data-testid='post-loading-message'>
          Loading post...
        </div>
      )
    }

    if (this.state.post === null) {
      return (
        <div data-testid='post-loading-failed'>
          Post could not be loaded.
        </div>
      )
    }

    const {
      title,
      description,
      body,
      author,
      tags,
      cover,
      createdAt
    } = this.state.post

    const postDate = new Date(createdAt)
    const dayMonthYear = `${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`

    return (
      <div>
        <h1 data-testid='post-title'>{title}</h1>
        <div>By: {author.displayName}</div>
        <div>{`By: ${author.displayName} on ${dayMonthYear}`}</div>
        <ul>
          {tags.map(tag => <li key={tag._id}>{`#${tag.name}`}</li>)}
        </ul>
        <p data-testid='post-description'>{description}</p>
        <div data-testid='post-body' dangerouslySetInnerHTML={{ __html: converter.makeHtml(body)}}></div>
      </div>
    )
  }
}
