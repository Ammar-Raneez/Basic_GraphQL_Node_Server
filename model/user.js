import mongoose from 'mongoose';

const mongooseSchema = mongoose.Schema;
const userSchema = new mongooseSchema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  profession: {
    type: String,
  }
});

export default mongoose.model('User', userSchema);
