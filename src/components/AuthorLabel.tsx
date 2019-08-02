import React from 'react'
import AuthorImage from './AuthorImage';
import styles from './AuthorLabel.module.css'

export default function AuthorLabel({
  name,
  imageUrl,
  imageProvider
}: {
  name: string,
  imageUrl: string,
  imageProvider?: string
}) {
  return (
    <div className={styles['author-label']}>
      <AuthorImage 
        name={name}
        src={imageUrl}
        provider={imageProvider}
      />
      <span className={styles.name}>{name}</span>
    </div>
  )
}
