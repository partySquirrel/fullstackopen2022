const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 128,
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 512,
    required: true
  },
  passwordHash: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true
  },
  blogs:
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  ,
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)