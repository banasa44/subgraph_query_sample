# GraphQL Data Display

This project is a simple test application built to understand how to use Apollo Client with TheGraph to query data from a GraphQL API. It demonstrates querying different types of data and displaying it in a React application.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/banasa44/subgraph_query_sample
   ```

2. Navigate to the project directory:

   ```bash
   cd subgraph_queries
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

## Usage

1. Start the development server:

   ```bash
   yarn start
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

3. Use the dropdown menu to select a query and enter any required parameters in the input fields.

4. Click on the "Display" button to see the results.

## Queries

The application includes the following predefined queries:

- **GET_PERMISSIONS_SUBDOMAIN**: Retrieve permissions based on subdomain.
- **PERMISSIONS_DAO**: Retrieve permissions for a specific DAO.
- **GET_DAOS**: Retrieve information about DAOs.
- **BALANCES_TOKEN_SUBDOMAIN**: Retrieve balances by token and subdomain.
- **BALANCES_DAO_TOKEN**: Retrieve balances for a specific token.

## Technologies Used

- React
- Apollo Client
- GraphQL
- TheGraph

## Contributing

Contributions are welcome! Please feel free to open a new issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
