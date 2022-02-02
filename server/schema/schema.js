import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import Hobby from '../../model/Hobby.js';
import Post from '../../model/Post.js';
import User from '../../model/user.js';

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
        return Post.find({ userId: String(parent.id) });
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find({ userId: String(parent.id) });
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

    // link two entities together
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id);
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
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Available Query',
  // how querying should be for specific entities
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
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
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
        return Hobby.findById(args.id);
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return Hobby.find();
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
        return Post.findById(args.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find();
      }
    }
  }
});


// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Available Mutations',
  fields: {
    // will be a method
    createUser: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: GraphQLInt
        },
        profession: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          age: args.age,
          profession: args.profession
        });

        return user.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: GraphQLInt
        },
        profession: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        const user = await User.findById(args.id);
        return User.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            age: user.age || args.age,
            profession: user.profession || args.profession
          }
        }, { new: true });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id).exec();
      }
    },
    createPost: {
      type: PostType,
      args: {
        comment: {
          type: new GraphQLNonNull(GraphQLString)
        },
        userId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        const post = new Post({
          comment: args.comment,
          userId: args.userId
        });

        return post.save();
      }
    },
    updatePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        comment: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(args.id, {
          $set: {
            comment: args.comment,
          }
        }, { new: true });
      }
    },
    deletePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        return Post.findByIdAndRemove(args.id).exec();
      }
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: GraphQLString,
        },
        userId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        const hobby = new Hobby({
          title: args.title,
          description: args.description,
          userId: args.userId
        });

        return hobby.save();
      }
    },
    updateHobby: {
      type: HobbyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        const hobby = await Hobby.findById(args.id);
        return Hobby.findByIdAndUpdate(args.id, {
          title: args.title,
          description: args.description || hobby.description
        }, { new: true });
      }
    },
    deleteHobby: {
      type: HobbyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        return Hobby.findByIdAndRemove(args.id).exec();
      }
    },
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
