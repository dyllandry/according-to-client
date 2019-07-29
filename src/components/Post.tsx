import React, { Component } from 'react'
import { Post as PostType, getPostById } from '../models/Post'
import { CmsUrlContext } from '../Context'
import { getLocalProviderImageUrl } from '../getProviderImageUrl';
import { getAuthorPictureAltText } from '../getAuthorPictureAltText';
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

  static contextType = CmsUrlContext

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
      createdAt,
      coverAlt
    } = this.state.post

    const postDate = new Date(createdAt)
    const dayMonthYear = `${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`

    const cmsUrl = this.context

    return (
      <div>
        <h1 data-testid='post-title'>{title}</h1>
        { cover && (
          <img 
            src={ cover.provider === 'local'
              ? getLocalProviderImageUrl(cmsUrl, cover.url)
              : cover.url
            }
            alt={coverAlt}>
          </img>
        ) }
        <div>{`By: ${author.displayName} on ${dayMonthYear}`}</div>
        {author && (
        <div>
          {author.picture && cmsUrl && (
            <img 
              src={author.picture.provider === 'local'
                ? getLocalProviderImageUrl(cmsUrl, author.picture.url)
                : author.picture.url
              }
              alt={getAuthorPictureAltText(author.displayName)}
            />
          )}
        </div>
      )}
        <ul>
          {tags.map(tag => <li key={tag.id}>{`#${tag.name}`}</li>)}
        </ul>
        <p data-testid='post-description'>{description}</p>
        <div data-testid='post-body' dangerouslySetInnerHTML={{ __html: converter.makeHtml(body)}}></div>
      </div>
    )
  }
}
