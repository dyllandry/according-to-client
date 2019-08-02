import React, { Component } from 'react'
import { 
  getPostSummaries,
  PostSummary as PostSummaryType
} from '../models/Post';
import PostSummary from '../components/PostSummary'
import styles from './Feed.module.css'

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
      <div aria-label='feed' className={styles.feed} data-testid='feed'>
        { 
          this.state.loadingPosts ? (
            <div data-testid="feed-loading-message">Loading posts...</div>
          ) : (
            this.state.posts.length === 0 ? (
              <div data-testid="feed-no-posts-to-display">No posts to display.</div>  
            ) : (
              <ul className={styles.list} data-testid='feed-post-summaries-list'>
                { this.state.posts.map(post => (
                  <li className={styles['list-item']} key={post.id}>
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
