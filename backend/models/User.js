import { model, Schema } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default model('User', schema)