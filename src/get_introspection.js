const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const fs = require("fs");
const {
  getIntrospectionQuery,
  graphql,
  buildSchema,
  printIntrospectionSchema,
} = require("graphql");
const { readFileSync } = require("fs");

const client = new ApolloClient({
  uri: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/api",
  cache: new InMemoryCache(),
});

const introspectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      types {
        kind
        name
        description

        fields {
          name
          description
          args {
            name
          }
          type {
            ...TypeRef
          }
        }
        inputFields {
          name
        }
        interfaces {
          kind
          name
        }
        enumValues {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          name
        }
      }
    }
  }

  # fragment FullType {
  #   kind
  #   name
  #   description

  #   fields {
  #     name
  #     description
  #     args {
  #       name
  #     }
  #     type {
  #       kind
  #       name
  #     }
  #   }
  #   inputFields {
  #     name
  #   }
  #   interfaces {
  #     kind
  #     name
  #   }
  #   enumValues {
  #     name
  #     description
  #     isDeprecated
  #     deprecationReason
  #   }
  #   possibleTypes {
  #     name
  #   }
  # }

  # fragment InputValue on __InputValue {
  #   name
  #   description
  #   type {
  #     ...TypeRef
  #   }
  #   defaultValue
  # }

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
    }
  }
`;

client
  .query({ query: introspectionQuery })
  .then((result) => {
    const introspectionResult = result.data;

    // Function to remove __typename field recursively
    const removeTypename = (obj) => {
      for (let key in obj) {
        if (key === "__typename") {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          removeTypename(obj[key]);
        }
      }
    };

    // Remove __typename field from each object in the result
    removeTypename(introspectionResult);
    removeTypename(introspectionResult.__schema);
    introspectionResult.__schema.types.forEach(removeTypename);

    // Convert the result to JSON
    const jsonResult = JSON.stringify(introspectionResult, null, 2);

    // Write the JSON result to a file
    fs.writeFileSync("introspection_result.json", jsonResult);
    console.log("Introspection result saved as introspection_result.json");
  })
  .catch((error) => {
    console.error("Error fetching introspection result:", error);
  });
