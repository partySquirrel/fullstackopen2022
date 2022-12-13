import React from 'react'
import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  if (!blog) return null

  const comment = useField('text')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    dispatch(commentBlog(blog, comment.value))
      .then(() => {
        dispatch(showNotification(`Commented '${blog.title}'`, 5))
        comment.onReset()
      })
      .catch((error) => {
        dispatch(
          showError(`failed to comment blog: ${error.response.data.error}`, 5)
        )
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="commentForm">
        <div>
          <label>
            <input name="comment" placeholder="comment" {...comment} />
          </label>
          <button type="submit" id="save">
            Add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
