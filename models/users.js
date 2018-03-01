let mongoose = require('mongoose');

let userSchema = mongoose.Schema(
  {
    username: String,
  }
);

let User =  mongoose.model('User', userSchema);

export default User
