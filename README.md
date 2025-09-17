- ApolloServer -> Let's us create a GraphQL server
- startStandaloneServer -> helper function to start the server quickly, without needing extra setup like EXPRESS.JS

✅ GraphQL Request Flow

Client sends a query or mutation to /graphql.

Server validates the query based on schema.

Resolver functions run and fetch data from database or other services.

Response is structured exactly as requested.

# typedefs :

- Use to define schema
- Defines types, queries, mutations, and relationships.
- example :
  const typeDefs = gql`
  type Book {
  id: ID
  title: String
  author: String
  }

        type Query {
            books: [Book]
            book(id: ID!): Book
        }

        type Mutation {
            addBook(title: String!, author: String!): Book
        }
        `;

# resolvers :

- This is the Code jo request handle karta hai aur data return karta hai.
- example : Node.js with Apollo Server :

        const resolvers = {
        Query: {
        users: () => [{ id: "1", name: "Rudransh", email: "r@example.com" }],
        user: (parent, args) => ({ id: args.id, name: "Rudransh", email: "r@example.com" }),
        },
        Mutation: {
        createUser: (parent, args) => ({ id: "2", name: args.name, email: args.email }),
        },
        };

# Query:

- Data read karne ka way.
- example :
  query {
  users {
  id
  name
  }
  }

# Mutation :

- Data modify (create, update, delete) karne ke liye.

- Example:

  mutation {
  createUser(name: "Rudransh", email: "rudransh@example.com") {
  id
  name
  }
  }

# Input Type:

- An input type is like a custom object you define to group multiple arguments together.
- Instead of sending 4 or 5 separate fields directly into a mutation , you can wrap them all inside one object.
