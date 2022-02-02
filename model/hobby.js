import mongoose from 'mongoose';

const mongooseSchema = mongoose.Schema;
const hobbySchema = new mongooseSchema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: String
  }
});

export default mongoose.model('Hobby', hobbySchema);
