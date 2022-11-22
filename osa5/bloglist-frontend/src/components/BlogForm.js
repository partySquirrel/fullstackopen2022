import { useState } from "react";

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
    <form onSubmit={handleAddBlog}>
      <div>
        <label>
          Title: <input type="text" name="title" value={title} onChange={handleInputTitleChange}/>
        </label>
      </div>
      <div>
        <label>
          Author: <input type="text" name="author" value={author} onChange={handleInputAuthorChange}/>
        </label>
      </div>
      <div>
        <label>
          URL: <input type="text" name="url" value={url} onChange={handleInputUrlChange}/>
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export default BlogForm