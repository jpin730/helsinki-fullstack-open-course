import { useState } from 'react'

export const Blog = ({ blog, isOwner, onLike, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleButtonLabel = isExpanded ? 'hide' : 'view'
  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return (
    <article
      style={{
        padding: '0 1rem',
        border: 'solid',
        borderWidth: 2,
        marginBottom: '1rem',
        borderRadius: '0.5rem',
      }}
    >
      <h3>
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleExpanded}>{toggleButtonLabel}</button>
      </h3>
      {isExpanded && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes &nbsp;
            <button onClick={onLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {isOwner && (
            <p>
              <button onClick={onDelete}>remove</button>
            </p>
          )}
        </>
      )}
    </article>
  )
}
