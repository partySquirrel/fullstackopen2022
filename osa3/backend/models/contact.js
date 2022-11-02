const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 512,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    maxlength: 14,
    validate: {
      validator: function (v) {
        return /^(\d{2,3}-)(\d{5,10})$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number (xx-xxxxxx or xxx-xxxxxx expected)`
    },
    required: true
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)