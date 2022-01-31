import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

// dummy data
const usersData = [
  { id: '1', name: 'Bond', age: 36, profession: 'Doctor' },
  { id: '2', name: 'Anna', age: 26, profession: 'Teacher' },
  { id: '3', name: 'Bella', age: 16, profession: 'Programmer' },
  { id: '4', name: 'Gina', age: 26, profession: 'Mechanic' },
  { id: '5', name: 'Georgina', age: 36, profession: 'Painter' }
]

// specify each entity
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    profession: {
      type: GraphQLString,
    }
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: '',
  // how querying should be or specific entities
  fields: {
    user: {
      type: UserType,

      // search with id arg
      args: {
        id: {
          type: GraphQLString,
        }
      },

      // data return
      resolve(parent, args) {
        return usersData.find((user) => user.id === args.id);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
