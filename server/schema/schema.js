import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
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
  { id: '1', title: 'Programming', description: 'Some test description', userId: '1' },
  { id: '2', title: 'Rowing', description: 'Some test description', userId: '1' },
  { id: '3', title: 'Swimming', description: 'Some test description', userId: '2' },
  { id: '4', title: 'Fencing', description: 'Some test description', userId: '3' },
  { id: '5', title: 'Hiking', description: 'Some test description', userId: '4' }
];
const postData = [
  { id: '1', comment: 'Some test comment', userId: '1' },
  { id: '2', comment: 'Some test comment', userId: '1' },
  { id: '3', comment: 'Some test comment', userId: '2' },
  { id: '4', comment: 'Some test comment', userId: '3' },
  { id: '5', comment: 'Some test comment', userId: '4' },
];

// specify each entity
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',

  // add this as a callback function
  // so that access of other types within this type
  // won't throw errors such as used before defined
  fields: () => ({
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
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postData.filter((post) => post.userId === parent.id);
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbyData.filter((hobby) => hobby.userId === parent.id);
      }
    }
  }),
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Documentation for hobbies...',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return usersData.find((user) => user.id === parent.userId);
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Documentation for posts...',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    comment: {
      type: GraphQLString
    },
    // link two entities together
    user: {
      type: UserType,
      resolve(parent, args) {
        // in this case parent is post and child is user
        return usersData.find((user) => user.id === parent.userId);
      }
    }
  })
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


// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // will be a method
    createUser: {
      type: UserType,
      args: {
        // id: {
        // type: GraphQLID
        // },
        name: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        },
        profession: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        const user = {
          name: args.name,
          age: args.age,
          profession: args.profession
        }

        return user;
      }
    },
    createPost: {
      type: PostType,
      args: {
        // id: {
        //   type: GraphQLID
        // }
        comment: {
          type: GraphQLString
        },
        userId: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        const post = {
          comment: args.comment,
          userId: args.userId
        }

        return post;
      }
    },
    createHobby: {
      type: HobbyType,
      args: {
        // id: {
        //   type: GraphQLID,
        // }
        title: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString,
        },
        userId: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        const hobby = {
          title: args.title,
          description: args.description,
          userId: args.userId
        }

        return hobby;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
