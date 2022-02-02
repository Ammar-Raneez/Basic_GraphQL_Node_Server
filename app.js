import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import './utils/database.js';
import schema from './server/schema/schema.js';

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}));

app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
});
