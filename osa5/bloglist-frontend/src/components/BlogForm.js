const BlogForm = ({
                    onSubmit,
                    onTitleChange, title,
                    onAuthorChange, author,
                    onUrlChange, url
                  }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        Title: <input type="text" name="title" value={title} onChange={onTitleChange}/>
      </label>
    </div>
    <div>
      <label>
        Author: <input type="text" name="author" value={author} onChange={onAuthorChange}/>
      </label>
    </div>
    <div>
      <label>
        URL: <input type="text" name="url" value={url} onChange={onUrlChange}/>
      </label>
    </div>
    <div>
      <button type="submit">Create</button>
    </div>
  </form>
)

export default BlogForm