import React from "react";
import { useQuery } from "@apollo/client";
import { QUERIES } from "./queries"; // Import all queries

function DataDisplay({ queryKey, queryFilter }) {
  const query = QUERIES[queryKey];
  const { loading, error, data } = useQuery(query, {
    variables: { queryFilter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // Render data based on the query
  switch (queryKey) {
    case "GET_PERMISSIONS_SUBDOMAIN":
      return (
        <div>
          <h2>Get Permissions ID for DAOs (enter subdomain)</h2>
          {/* Render permissions data here */}
          {data.daos.map((dao) => (
            <div key={dao.id}>
              {dao.permissions.map((perm) => (
                <p key={perm.id} className="wrapped-text">
                  {perm.id}
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    case "PERMISSIONS_DAO_ID":
      return (
        <div>
          <h2>Get DAO subdomain thorugh permissions_id</h2>
          {data.permissions.map((perm) => (
            <div key={perm.dao.subdomain}>
              <p>Subdomain: {perm.dao.subdomain}</p>
            </div>
          ))}
        </div>
      );
    case "GET_DAOS_SUBDOMAIN":
      return (
        <div>
          <h2>Display DAOs info and Proposal type for DAO subdomains</h2>
          {/* Render daos data here */}
          {data.daos.map(({ subdomain, createdAt, permissions, actions }) => (
            <div key={subdomain} className="dao-item">
              <h3>Subdomain: {subdomain}</h3>
              <p>Created At: {createdAt || "N/A"}</p>
              <p>
                Permissions:{" "}
                {permissions.length > 0 ? permissions[0].actor : "N/A"}
              </p>
              <div>
                <h4>Actions:</h4>
                {actions.length > 0 ? (
                  actions.map((action, index) => (
                    <div key={index} className="action-item">
                      <p>
                        Proposal Creator: {action.proposal.creator || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No actions available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    case "BALANCES_TOKEN_SUBDOMAIN":
      return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "20px" }}>
            Display balance of DAOs by subdomain{" "}
          </h2>
          {data.erc20Balances.map((balance) => (
            <div
              key={`${balance.token.name}-${balance.id}-${balance.balance}`}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                wordWrap: "break-word",
              }}
            >
              <p>
                <strong>Token Name:</strong> {balance.token.name}
              </p>
              <p>
                <strong>Balance ID:</strong> {balance.id}
              </p>
              <p>
                <strong>Balance:</strong> {balance.balance}
              </p>
            </div>
          ))}
        </div>
      );

    case "BALANCES_DAO_TOKEN_ID":
      const tokenName = data.erc20Balances[0]?.token.name;

      return (
        <div>
          <h2>Display which DAOs have some token</h2>
          <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            Searching for DAOs helding {tokenName}:
          </p>
          {/* Mapping over each balance to display DAO subdomains */}
          <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            DAO Subdomains:
          </p>
          {data.erc20Balances.map((balance) => (
            <div key={balance.dao.subdomain}>
              <p>{balance.dao.subdomain}</p>
            </div>
          ))}
        </div>
      );
    case "ATRIBUTES_SUBDOMAIN":
      return (
        <div>
          <h2>
            Display ERC20 DAOs balance and types op Proposals per subdomain:{" "}
            {queryFilter}
          </h2>
          {data.daos.map((dao, index) => (
            <div key={index} className="dao-item">
              <h3>DAO Balances:</h3>
              {dao.balances.map((balance, index) => (
                <p key={index}>
                  Token: {balance.token ? balance.token.name : "Unknown"},
                  Balance: {balance.balance}
                </p>
              ))}
              <h3>DAO Actions:</h3>
              {dao.actions.map((action, index) => (
                <p key={index}>Proposal Type: {action.proposal.__typename}</p>
              ))}
            </div>
          ))}
        </div>
      );
    // Add
    // Add more cases as needed for additional queries
    default:
      return null;
  }
}

export default DataDisplay;
