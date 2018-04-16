const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = graphql;

const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '2' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '1' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '4' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '4' },
  { name: 'The Long Earth 2', genre: 'Sci-Fi', id: '3', authorId: '4' },
  { name: 'The Long Earth 3', genre: 'Sci-Fi', id: '3', authorId: '4' },
  { name: 'The Long Earth 4', genre: 'Sci-Fi', id: '3', authorId: '4' }
];

const author = [
  { id: '1', name: 'john', age: 22 },
  { id: '2', name: 'bail', age: 24 },
  { id: '3', name: 'andrew', age: 28 },
  { id: '4', name: 'best author', age: 30 }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return author.find(el => el.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(el => el.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //to get data from db or other source
        return books.find(el => el.id === args.id);
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return author.find(el => el.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
