const express = require('express');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

// Auto increment
let id_user = 1;
let id_post = 1;


// Persist data in memory
const providers = {
  posts: [
    {
      "id": id_post++,
      "title": 'Titulo '+id_post,
      "user_id": 3
    },
    {
      "id": id_post++,
      "title": 'Titulo '+id_post,
      "user_id": 3
    },
    {
      "id": id_post++,
      "title": 'Titulo '+id_post,
      "user_id": 5
    }
  ],
  users: [
    {
      "id": id_user++,
      "name": "Usuário 1",
      "age": 26,
      "posts": []
    },
    {
      "id": id_user++,
      "name": "Usuário 2",
      "age": 32,
      "posts": []
    },
    {
      "id": id_user++,
      "name": "Usuário 3",
      "age": 54,
      "posts": []
    },
    {
      "id": id_user++,
      "name": "Usuário 4",
      "age": 13,
      "posts": []
    },
    {
      "id": id_user++,
      "name": "Usuário 5",
      "age": 22,
      "posts": []
    },
    {
      "id": id_user++,
      "name": "Usuário 6",
      "age": 33,
      "posts": []
    }
  ]
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID
    name: String!
    age: Int
    posts: [Post!]
  }
  type Post {
    id: ID
    title: String!
    content: String
    user: User!
  }  
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getPost(id: ID!): Post
    getPosts: [Post]
  }
  type Mutation {
    createUser(name: String!, age: Int): User
    createPost(title: String!, content: String!, user_id: ID!): Post
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  User: {
    posts: (root) => {
      return _.filter(providers.posts, function(post) {
        return(post.user_id == root.id);
      });
    }
  },
  Post: {
    user: (root) => {
      return _.filter(providers.users, function(user) {
        return(user.id == root.user_id)
      })[0];
    }
  },
  Query: {
    getUser: (root, {id}) => {
      return providers.users.find(item => item.id == id);
    },
    getUsers: () => {
      return providers.users;
    },  
    getPost: (root, {id}) => {
      return providers.posts.find(item => item.id == id);      
    },
    getPosts: () => {
      return providers.posts;
    }
  },
  Mutation: {    
    createUser: (root, {name, age = 0}) => {
      const user = {
        id: id_user++,
        name: name,
        age: age,
        posts: []
      };
      providers.users.push(user);  
      return user;
    },
    createPost: (root, {title, content, user_id}) => {
      const post = {
        id: id_post++,
        title: title,
        content: content,
        user_id: user_id
      };
      providers.posts.push(post);  
      return post;
    }    
  }
};

const corsOptions = {
  origin: 'localhost:4000/graphql',
  // credentials: true
}

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    playground: {
      settings: {
          'editor.theme': 'light',
      },
    },
 });

const app = express();

server.applyMiddleware({ app, cors: true, bodyParserConfig: true});

const port = 4001;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);