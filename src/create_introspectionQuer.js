import fetch from "node-fetch";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";
import { writeFile } from "fs/promises";

async function main() {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch(
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: introspectionQuery }),
    }
  );
  console.log(introspectionQuery);
  const { data } = await response.json();

  const schema = buildClientSchema(data);

  const schemaString = printSchema(schema);

  const outputFile = "./result.gql";

  await writeFile(outputFile, schemaString);
  console.log(`Schema has been written to ${outputFile}`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
