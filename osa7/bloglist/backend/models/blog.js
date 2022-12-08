const mongoose = require('mongoose')
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 128,
      required: true,
    },
    author: {
      type: String,
      minlength: 3,
      maxlength: 512,
      required: true,
    },
    url: {
      type: String,
      minlength: 10,
      maxlength: 1024,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
