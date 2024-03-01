import { gql } from "@apollo/client";

export const QUERIES = {
  GET_PERMISSIONS_SUBDOMAIN: gql`
    query ($queryFilter: String!) {
      daos(where: { subdomain: $queryFilter }) {
        permissions {
          id
        }
      }
    }
  `,
  PERMISSIONS_DAO_ID: gql`
    query ($queryFilter: String!) {
      permissions(where: { id: $queryFilter }) {
        dao {
          subdomain
        }
      }
    }
  `,
  GET_DAOS_SUBDOMAIN: gql`
    query ($queryFilter: String!) {
      daos(where: { subdomain: $queryFilter }) {
        subdomain
        createdAt
        permissions(first: 1) {
          actor
        }
        actions(first: 2, where: { proposal_: { id: 10 } }) {
          proposal {
            ... on IProposal {
              __typename
              creator
            }
          }
        }
      }
    }
  `,
  BALANCES_TOKEN_SUBDOMAIN: gql`
    query ($queryFilter: String!) {
      erc20Balances(where: { dao_: { subdomain: $queryFilter } }) {
        id
        token {
          name
        }
        balance
      }
    }
  `,
  BALANCES_DAO_TOKEN_ID: gql`
    query ($queryFilter: String!) {
      erc20Balances(where: { token: $queryFilter }) {
        token {
          name
        }
        dao {
          subdomain
        }
      }
    }
  `,
  ATRIBUTES_SUBDOMAIN: gql`
    query ($queryFilter: String!) {
      daos(where: { subdomain: $queryFilter }) {
        balances {
          ... on ERC20Balance {
            token {
              name
            }
            balance
          }
        }
        actions {
          proposal {
            ... on IProposal {
              __typename
              creator
            }
          }
        }
      }
    }
  `,
};
