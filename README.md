# Auction House Prototype

React and Material UI frontend using JSON Server as a local mock backend.

## How it works

The interface lists auction items, opens individual auction pages and submits bids through requests to `http://localhost:4000/products`. User lookup and login screens are demonstration code rather than production authentication.

## Usage

Requires Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

The script starts the React development server on port 3000 and JSON Server on port 4000. Alternatively, run `npm start` and `npm run json:server` in separate terminals.

## Notes

Some imported packages, including React Router and additional MUI components, are not declared in `package.json`; resolve these dependencies before a clean installation can build. Mock data is stored in `products.json`.
