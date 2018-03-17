import React, { Component } from 'react'
import Registry from '../build/contracts/Registry.json'
import Token from '../build/contracts/EIP20.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

import './css/home.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      votingButtonPressed: false
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    // Declaring this for later so we can chain functions on SimpleStorage.
    var registryInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getRegistry().then((instance) => {
        registryInstance = instance
        return registryInstance.name.call()
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result })
      })
    })
  }

  handleButtonClick(value) {
    this.setState({votingButtonPressed: value})
  }

  approveTransfer() {
    var registryInstance
    var tokenInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getRegistry().then((instance) => {
        registryInstance = instance
        return this.getToken()
      }).then((instance) => {
        tokenInstance = instance
        return tokenInstance.approve(registryInstance.address, 10, {from: accounts[0]})
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  applyNewEntry() {
    var registryInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getRegistry().then((instance) => {
        registryInstance = instance
        return registryInstance.apply("0x1234", 10, "Some string", {from: accounts[0]})
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  getToken() {
    const token = contract(Token)
    token.setProvider(this.state.web3.currentProvider)
    return token.deployed()
  }

  getRegistry() {
    const registry = contract(Registry)
    registry.setProvider(this.state.web3.currentProvider)
    return registry.deployed()
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">MIT Bitcoin Hackathon</a>
        </nav>

        <main className="container">

          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Transparency TCR</h1>
              <p>The name of this tcr is: {this.state.storageValue}</p>
            </div>
          </div>

          {!this.state.votingButtonPressed && (
            <div className="home">
              <div className="header">Transparency TCR List page</div>
              <div className="list">
                <hr/>
                <li>Entry1</li>
                <hr/>
                <li>Entry2</li>
                <hr/>
                <li>Entry3</li>
                <hr/>
                <li>Entry4</li>
              </div>
              <div className="header">
                <button className="voting" onClick={() => this.handleButtonClick(true)}>VOTE PAGE</button>
              </div>
            </div>

          )}

          {this.state.votingButtonPressed && (
            <div>
              <p className="header">VOTING PAGE - STUFF HERE </p>
                <div className="home">
                  <div className="header">
                    Transparency TCR List page
                  </div>
                  <div className="list">
                    <hr/>
                    <li>Entry1</li>
                    <hr/>
                    <li>Entry2</li>
                    <hr/>
                    <li>Entry3</li>
                    <hr/>
                    <li>Entry4</li>
                  </div>
                  <div className="header">
                    TCR List Applications
                  </div>
                  <ul>
                    <li>
                      Application 1
                      <button className="voting">Accept</button>
                      <button className="voting">Reject</button>
                    </li>
                    <li>
                      Application 2
                      <button className="voting">Accept</button>
                      <button className="voting">Reject</button>
                    </li>
                    <li>
                      Application 3
                      <button className="voting">Accept</button>
                      <button className="voting">Reject</button>
                    </li>
                  </ul>
                </div>
              <div className="header">
                <button className="voting" onClick={() => this.handleButtonClick(false)}>GO BACK</button>
              </div>
            </div>
          )}

        </main>
      </div>
    );
  }
}

export default App
