import React from 'react'
import { PostSummary as PostSummaryType } from '../models/Post'

export default function PostSummary({
  title,
  description
} : PostSummaryType) {
  return (
    <div>
      <h3 data-testid='post-summary-title'>{title}</h3>
      <p data-testid="post-summary-description">{description}</p>
    </div>
  )
}
