import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) => {
  console.error('Error Connecting to mongo instance', err);
});
