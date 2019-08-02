import React, { useContext } from 'react'
import { PostSummary as PostSummaryType } from '../models/Post'
import { Link } from 'react-router-dom';
import { getLocalProviderImageUrl } from '../getProviderImageUrl';
import { CmsUrlContext } from '../Context'
import AuthorLabel from './AuthorLabel';

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
    <div>
      { cover && cmsUrl && (
        <img
          src={ cover.provider === 'local' 
            ? getLocalProviderImageUrl(cmsUrl, cover.url)
            : cover.url
          }
          alt={ coverAlt }
        />
      )}
      <div>{dayMonthYear}</div>
      <AuthorLabel 
        name={author.displayName}
        imageUrl={author.picture.url}
        imageProvider={author.picture.provider}
      />
      
      <h3 data-testid='post-summary-title'>
        <Link data-testid='post-summary-link' to={`/post/${id}`}>
          {title}
        </Link>
      </h3>
      <p data-testid="post-summary-description">{description}</p>
    </div>
  )
}
