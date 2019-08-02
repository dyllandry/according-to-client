import React, { useContext } from 'react'
import { getAuthorPictureAltText } from '../getAuthorPictureAltText'
import { getLocalProviderImageUrl } from '../getProviderImageUrl';
import { CmsUrlContext } from '../Context'
import styles from './AuthorImage.module.css'

export default function AuthorImage({
  name,
  src,
  provider
}: {
  name: string,
  src: string,
  provider?: string
}) {
  const cmsUrl = useContext(CmsUrlContext)
  return (
    <img
      className={styles['author-image']}
      src={(provider && cmsUrl) 
        ? getLocalProviderImageUrl( cmsUrl, src)
        : src
      } 
      alt={getAuthorPictureAltText(name)}
    />
  )
}
