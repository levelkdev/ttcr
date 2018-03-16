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
