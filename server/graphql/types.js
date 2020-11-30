import { gql } from "apollo-server-express";
import { GraphQLScalarType, GraphQLError, Kind } from "graphql";

const gQlScalarType = new GraphQLScalarType({
  name: "gQlScalar",
  description: "Any JSON object. This type bypasses type checking",
  serialize: (value) => {
    return value;
  },
  parseValue: (value) => {
    return value;
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.OBJECT) {
      throw new GraphQLError(
        "Query error: Can only parse object but got a: " + ast.kind,
        [ast]
      );
    }
    return ast.value;
  },
});

const typeDefs = gql`
  scalar gQlScalar
  type Query {
    getOgMetadata(url: String!): ogMetadata
  }
  type ogMetadata {
    ogInfo: gQlScalar
  }
`;

export default typeDefs;
