import React from 'react'
import { PostSummary as PostSummaryType } from '../models/Post'
import { Link } from 'react-router-dom';

export default function PostSummary({
  id,
  title,
  description
} : PostSummaryType) {
  return (
    <div>
      <h3 data-testid='post-summary-title'>
        <Link data-testid='post-summary-link' to={`/post/${id}`}>
          {title}
        </Link>
      </h3>
      <p data-testid="post-summary-description">{description}</p>
    </div>
  )
}
