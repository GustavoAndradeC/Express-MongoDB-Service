const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password; 
    delete ret.__v; 
    delete ret.createdAt; 
    delete ret.updatedAt; 
    return ret;
  }
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v; 
    delete ret.createdAt;
    delete ret.updatedAt; 
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
