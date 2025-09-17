import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let allUsers = [];
let idCounter = 1;
// const allUsers = [
//   {
//     id: "1",
//     name: "Alice",
//   },
//   { id: "2", name: "Bob" },
// ];

const newUsers = [];
const allPosts = [
  {
    id: "101",
    title: "GraphQL Basics",
    content: "Intro to GraphQL",
    authorId: "1",
  },
  {
    id: "102",
    title: "Advanced GraphQL",
    content: "Deep dive",
    authorId: "1",
  },
  {
    id: "103",
    title: "Node.js Tips",
    content: "Some tips",
    authorId: "2",
  },
];

const server = new ApolloServer({
  typeDefs: `#graphql //! Used this - "#graphql" because of an extension which formats the typeDefs for us

  type User{
    id:ID!
    # name:String
    # posts:[Post!]
    fName:String!
    lName:String!
    email:String!
    pass:String!
  }

  # type Post{
  #   id:ID!
  #   title:String!
  #   content:String!
  #   author:User!
  #   authorId:String
  # }

  type Query {
    # When called for users ->  they'll get an array of users as result
    users:[User!]!
    # user(id:ID!):User!
    # posts:[Post!]!
  }

  input AddUserInput{
    fN:String!
    lN:String!
    email:String!
    pass:String!
  }

  type Mutation{
    addUser(input:AddUserInput!):User!
    # addUser(fN:String!,lN:String!,email:String!,pass:String!):User!
  }
  
  `,
  resolvers: {
    Query: {
      users: () => allUsers,
      // posts: () => allPosts,
      // user: (parent, args) => {
      //   console.log("allUsers: ", allUsers);
      //   console.log("args: ", args);
      //   const ans = allUsers.find((user) => user.id == args.id);
      //   console.log("ans: ", ans);
      //   return ans;
      // },
    },

    Mutation: {
      addUser: (parent, args) => {
        const { input } = args;
        console.log("args: ", args);
        console.log("input: ", input);

        console.log("allUsers: ", allUsers);
        const newUser = {
          id: String(idCounter),
          fName: input.fN,
          lName: input.lN,
          email: input.email,
          pass: input.pass,
        };

        idCounter = idCounter + 1;
        allUsers.push(newUser);
        return newUser;
      },
    },

    // User: {
    //   posts: (parent, args, ctx, info) => {
    //     console.log("parent: ", parent);
    //     return allPosts.filter((post) => post.authorId == parent.id);
    //   },
    // },

    // Post: {
    //   author: (parent, args) => {
    //     return allUsers.find((user) => {
    //       return user.id === parent.authorId;
    //     });
    //   },
    // },
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`Server ready at : ${url}`);
