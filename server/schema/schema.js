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
];
const hobbyData = [
  { id: '1', title: 'Programming', description: 'Some test description' },
  { id: '2', title: 'Rowing', description: 'Some test description' },
  { id: '3', title: 'Swimming', description: 'Some test description' },
  { id: '4', title: 'Fencing', description: 'Some test description' },
  { id: '5', title: 'Hiking', description: 'Some test description' }
];
const postData =  [
  { id: '1', comment: 'Some test comment' },
  { id: '2', comment: 'Some test comment' },
  { id: '3', comment: 'Some test comment' },
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

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Documentation for hobbies...',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Documentation for posts...',
  fields: {
    id: {
      type: GraphQLID
    },
    comment: {
      type: GraphQLString
    }
  }
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
          type: GraphQLID,
        }
      },

      // data return
      resolve(parent, args) {
        return usersData.find((user) => user.id === args.id);
      }
    },
    hobby: {
      type: HobbyType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return hobbyData.find((hobby) => hobby.id === args.id);
      }
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLID
        },
      },
      resolve(parent, args) {
        return postData.find((post) => post.id === args.id);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
