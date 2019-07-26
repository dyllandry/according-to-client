import React, { Component } from 'react'
import { 
  getPostSummaries,
  PostSummary as PostSummaryType
} from '../models/Post';
import PostSummary from '../components/PostSummary'

interface Props {}
interface State {
  posts: PostSummaryType[]
  loadingPosts: boolean
}

export default class Feed extends Component<Props, State> {

  _isMounted = false

  constructor (props: Props) {
    super(props)
    this.state = { 
      posts: [],
      loadingPosts: true
    }
  }

  async componentDidMount () {
    this._isMounted = true
    const posts = await getPostSummaries()
    if (this._isMounted) {
      this.setState({ 
        posts,
        loadingPosts: false
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render() {
    return (
      <div data-testid='feed'>
        <h2 data-testid="feed-header">Feed</h2>
        { 
          this.state.loadingPosts ? (
            <div data-testid="feed-loading-message">Loading posts...</div>
          ) : (
            this.state.posts.length === 0 ? (
              <div data-testid="feed-no-posts-to-display">No posts to display.</div>  
            ) : (
              <ul data-testid='feed-post-summaries-list'>
                { this.state.posts.map(post => (
                  <li key={post._id}>
                    <PostSummary {...post}/>
                  </li>
                ))}
              </ul>
            )
          )
        }
      </div>
    )
  }
}
