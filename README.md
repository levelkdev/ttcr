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

## Development

### Stack

* [React](https://facebook.github.io/react/) v15.6 for UI
* [Mobx](https://mobx.js.org/) v3.2 for state management
* [Sass](http://sass-lang.com/) for styling
* [Font Awesome](http://fontawesome.io/) v4.7 for icons
* [react-intl](https://github.com/yahoo/react-intl) v2.3 for internationalization
* [dotenv](https://github.com/motdotla/dotenv) v4.0 for environment config

### Dev Stack

* [Webpack](https://webpack.js.org/) v3.4 for module bundling
* [standardJS](https://standardjs.com/) v10.0 for linting
* [jest](https://facebook.github.io/jest/) v20.0 for testing
* [enzyme](http://airbnb.io/enzyme/) v2.9 for component testing
* [sazerac](http://sazeracjs.com/) v0.4 for data driven testing

### Scripts

`yarn build` - builds `bundle.js` to `assets/`

`yarn test` - runs `jest` test runner

`yarn lint` - runs [standardjs](https://standardjs.com/) linter
