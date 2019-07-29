import React, { useContext } from 'react'
import { PostSummary as PostSummaryType } from '../models/Post'
import { Link } from 'react-router-dom';
import { getLocalProviderImageUrl } from '../getProviderImageUrl';
import { CmsUrlContext } from '../Context'

export default function PostSummary({
  id,
  title,
  description,
  cover,
  coverAlt
} : PostSummaryType) {
  const cmsUrl = useContext(CmsUrlContext)
  return (
    <div>
      <h3 data-testid='post-summary-title'>
        { cover && cmsUrl && (
          <img
            src={ cover.provider === 'local' 
              ? getLocalProviderImageUrl(cmsUrl, cover.url)
              : cover.url
            }
            alt={ coverAlt }
          />
        )}
        <Link data-testid='post-summary-link' to={`/post/${id}`}>
          {title}
        </Link>
      </h3>
      <p data-testid="post-summary-description">{description}</p>
    </div>
  )
}
