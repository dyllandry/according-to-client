import React, { useContext } from 'react'
import { PostSummary as PostSummaryType } from '../models/Post'
import { Link } from 'react-router-dom';
import { getLocalProviderImageUrl } from '../getProviderImageUrl';
import { CmsUrlContext } from '../Context'
import AuthorLabel from './AuthorLabel';
import styles from './PostSummary.module.css'

export default function PostSummary({
  id,
  title,
  description,
  cover,
  coverAlt,
  createdAt,
  author
} : PostSummaryType) {
  const cmsUrl = useContext(CmsUrlContext)

  const postDate = new Date(createdAt)
  const dayMonthYear = `${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}`
  
  return (
    <Link className={styles.link} data-testid='post-summary-link' to={`/post/${id}`}>
      <div className={styles['post-summary']}>
        { cover && cmsUrl && (
          <img
            className={styles.cover}
            src={ cover.provider === 'local' 
              ? getLocalProviderImageUrl(cmsUrl, cover.url)
              : cover.url
            }
            alt={ coverAlt }
          />
        )}
        <div 
          className={cover 
            ? styles['author-date--flex__with-cover']
            : styles['author-date--flex']
        }>
          <AuthorLabel 
            name={author.displayName}
            imageUrl={author.picture.url}
            imageProvider={author.picture.provider}
          />
          <div className={styles.date}>{dayMonthYear}</div>
        </div>

        <h3 className={styles.title} data-testid='post-summary-title'>
          
            {title}
        </h3>
        <p className={styles.description} data-testid="post-summary-description">{description}</p>
      </div>
    </Link>
  )
}
