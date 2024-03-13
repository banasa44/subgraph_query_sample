const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const fs = require("fs");

const client = new ApolloClient({
  uri: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/api",
  cache: new InMemoryCache(),
});

const introspectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      types {
        ...FullType
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

client
  .query({ query: introspectionQuery })
  .then((result) => {
    const introspectionResult = result.data;
    const formattedResult = {
      __schema: {
        queryType: introspectionResult.__schema.queryType,
        types: introspectionResult.__schema.types,
      },
    };
    const jsonResult = JSON.stringify(formattedResult, null, 2);
    fs.writeFileSync("introspection_result.json", jsonResult);
    console.log("Introspection result saved as introspection_result.json");
  })
  .catch((error) => {
    console.error("Error fetching introspection result:", error);
  });
