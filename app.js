import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './server/schema/schema.js';

const app = express();
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}));

app.listen(4000, () => {
  console.log(`Listening on port 3000`);
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
});
