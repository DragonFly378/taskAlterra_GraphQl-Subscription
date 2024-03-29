import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_GRAPHQL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://todolist-hafiz.hasura.app/v1/graphql",
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

// const client = new ApolloClient({
//   uri: process.env.REACT_APP_SERVER_GRAPHQL,
//   cache: new InMemoryCache(),
//   headers: {
//     "x-hasura-admin-secret": process.env.REACT_APP_SECRET_KEY,
//   },
// });
