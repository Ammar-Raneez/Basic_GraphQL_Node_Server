import mongoose from 'mongoose';

const mongooseSchema = mongoose.Schema;
const postSchema = new mongooseSchema({
  comment: {
    type: String
  },
  userId: {
    type: String
  }
});

export default mongoose.model('Post', postSchema);
