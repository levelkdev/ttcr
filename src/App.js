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
this.handleEntryChange = this.handleEntryChange.bind(this);
this.handleChallengeChange = this.handleChallengeChange.bind(this);
    this.state = {
      storageValue: 0,
      web3: null,
      votingButtonPressed: false,
      approved: false,
      listings: ["one", "two"],
      value: "",
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
      this.listings()
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

  listings () {
    var registryInstance
    var tokenInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getRegistry().then((instance) => {
        registryInstance = instance
        return registryInstance.getListingsArray()
      }).then((listings) => {
        this.setState({"listings": listings.map(window.web3.toAscii)})
        console.log(listings)
      }).catch((error) => {
        console.log(error)
      })
    })
  }
  approve(value) {
    this.approveTransfer()
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
        console.log("EntryName State:" + this.state.entryName)
        return registryInstance.apply(this.state.entryName, 10, "Some string", {from: accounts[0]})
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    })
  }
  
  challengeEntry() {
    var registryInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getRegistry().then((instance) => {
        registryInstance = instance
        console.log("ChallengeName State:" + this.state.challengeName, {from: accounts[0]})
        return registryInstance.challenge(this.state.challengeName, "Another string", {from: accounts[0]})
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    })
  }

  voteToAccept() {
    var PLCRVotingInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.getPLCRVoting().then((instance) => {
        PLCRVotingInstance = instance
        return PLCRVotingInstance.apply("")
      })
      
    })
  }  

  getToken() {
    const token = contract(Token)
    token.setProvider(this.state.web3.currentProvider)
    return token.deployed()
  }

  handleEntryChange(event) {
    this.setState({entryName: event.target.value});
  }

  handleChallengeChange(event) {
    this.setState({challengeName: event.target.value});
  }

  getRegistry() {
    const registry = contract(Registry)
    registry.setProvider(this.state.web3.currentProvider)
    return registry.deployed()
  }

  getPLCRVoting() {
    const PLCRVoting = contract(PLCRVoting)
    PLCRVoting.setProvider(this.state.web3.currentProvider)
    return PLCRVoting.deployed()
  }

  render() {
    const listItems = this.state.listings.map((number) =>
  <li>{number}</li>
);
    console.log(this.state.listings)
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
                {listItems}
              </div>
              <hr/>
              <div>
                <div className="header">APPLICATION FORM</div>
                <form>
                  <label>Name:</label>
                  <input className="input" type="text" name="name" value={this.state.entryName} onChange={this.handleEntryChange} />
                  <div>
                    <button onClick={(e) => {this.approve(true), e.preventDefault()}} className={(this.state.approved === true ? 'active voting' : 'voting')}>APPROVE</button>
                    <button onClick={(e) => {this.applyNewEntry(), e.preventDefault()}} className="voting">APPLY</button>
                  </div>
                </form>

                <div className="header">Challenge FORM</div>
                <form>
                  <label>Name:</label>
                  <input className="input" type="text" name="name" value={this.state.challengeName} onChange={this.handleChallengeChange} />
                  <div>
                    <button onClick={(e) => {this.approve(true), e.preventDefault()}} className={(this.state.approved === true ? 'active voting' : 'voting')}>APPROVE</button>
                    <button onClick={(e) => {this.challengeEntry(), e.preventDefault()}} className="voting">Challenge</button>
                  </div>
                </form>
              </div>
              <div className="header">
                <button className="voting" onClick={() => this.handleButtonClick(true)}>VOTE PAGE</button>
              </div>
            </div>
          )}

          {this.state.votingButtonPressed && (
            <div>
              <p className="header">VOTING PAGE</p>
              <div className="home">
                <div className="header">
                  Current TCR List:
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
                <div className="header underline">
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
              <div className="header underline">Criteria for Transparency:</div>
              <h3>Criteria #1:</h3>
              <h5>This criteria requires that a hackathon team..</h5>
              <h3>Criteria #2:</h3>
              <h5>This criteria requires that a hackathon team..</h5>
              <h3>Criteria #3:</h3>
              <h5>This criteria requires that a hackathon team..</h5>
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
