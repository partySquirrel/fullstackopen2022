import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleInputTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleInputAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleInputUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const blog = await onSubmit({ title, author, url })
    if (blog) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleAddBlog} className="blogForm">
      <div>
        <label>
          Title:{' '}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputTitleChange}
            placeholder="title of the blog"
          />
        </label>
      </div>
      <div>
        <label>
          Author:{' '}
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleInputAuthorChange}
            placeholder="author of the blog"
          />
        </label>
      </div>
      <div>
        <label>
          URL:{' '}
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleInputUrlChange}
            placeholder="url of the blog"
          />
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default BlogForm
