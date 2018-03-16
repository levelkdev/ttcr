# ttcr

TCP Project for the MIT Bitcoin Hackathon 2018

## Setup

`npm install -g truffle` - Install Truffle globally

`truffle develop` - Run the development console

In the dev console: Note inside the development console we don't preface commands with truffle.

`compile` - Compile the smart contract

`migrate` - Migrate the smart contract

Outside the dev console: 

Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.

`npm run start` - Serves the front-end on http://localhost:3000

## Testing

Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.

`test` - If inside the development console.

`truffle test` - If outside the development console

Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors

`npm run test` - Run Jest outside of the development console for front-end component test

## Build

To build the application for production, use the build command. A production build will be in the build_webpack folder

`npm run build`