import './App.css';
import Main from './Main.js'
import React, { Component } from 'react';
import Web3 from 'web3';
import stakingContract from './stakingContract.json';
import Navbar from './Navbar.js';
import StakeToken from './StakeToken.json';
import LPToken from './LPToken.json';
import RewardToken from './RewardToken.json';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

  async loadBlockchainData() {
    const web3 = window.web3


    // load stake token and stake token bal of connected address
    const StakeTokenData = StakeToken.networks[this.state.networkID]
    if (StakeTokenData) {
      const StakeTokenAddress = StakeToken.networks[this.state.networkID].address
      const staketoken = new web3.eth.Contract(StakeToken.abi, StakeTokenAddress)
      this.setState({ staketoken })
      let StakeTokenBalance = await staketoken.methods.balanceOf(this.state.account).call()

      this.setState({ StakeTokenBalance: StakeTokenBalance.toString() })

    } else {
      window.alert('token to be staked not on this blockchain network, switch to ropsten')
    }

    // load LP token and LP token bal of connected address
    const LPTokenData = LPToken.networks[this.state.networkID]

    if (LPTokenData) {
      const LPTokenAddress = LPToken.networks[this.state.networkID].address

      const lptoken = new web3.eth.Contract(LPToken.abi, LPTokenAddress)
      this.setState({ lptoken })

      let LPTokenBalance = await lptoken.methods.balanceOf(this.state.account).call()
      this.setState({ LPTokenBalance: LPTokenBalance.toString() })

    } else {}

    // load stake token and stake token bal of connected address
    const RewardTokenData = RewardToken.networks[this.state.networkID]
    if (RewardTokenData) {
      const RewardTokenAddress = RewardToken.networks[this.state.networkID].address

      const rewardtoken = new web3.eth.Contract(RewardToken.abi, RewardTokenAddress)
      this.setState({ rewardtoken: rewardtoken })

      let RewardTokenBalance = await rewardtoken.methods.balanceOf(this.state.account).call()

      this.setState({
        RewardTokenBalance: RewardTokenBalance.toString()
      })

    } else {}


    // load staking contract 
    const StakingContractData = stakingContract.networks[this.state.networkID]
    if (StakingContractData) {
      this.setState({ stakingcontractdata: true })
      const StakingContractAddress = stakingContract.networks[this.state.networkID].address
      this.setState({ StakingContractAddress: StakingContractAddress })

      const StakingContract = new web3.eth.Contract(stakingContract.abi, StakingContractAddress)
      this.setState({ StakingContract })
    } else {
      this.setState({ stakingcontractdata: false })
      window.alert('staking contract not live on this blockchain, please switch to ropsten')
    }

    this.setState({ loading: false })


  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const web3 = window.web3

      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
  
  
      const ethBalance = await web3.eth.getBalance(this.state.account)
      this.setState({ ethBalance: ethBalance })

      const networkID = await web3.eth.net.getId()
      console.log(networkID)
      this.setState({networkID: networkID})
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      const web3 = window.web3

      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
  
  
      const ethBalance = await web3.eth.getBalance(this.state.account)
      this.setState({ ethBalance: ethBalance })

      const networkID = await web3.eth.net.getId()
      console.log(networkID)
      this.setState({networkID: networkID})
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install metamask chrome extension and refresh page')
    }
  }

  stake = (AmountStaked) => {
    if (this.state.stakingcontractdata === true) {
      this.state.staketoken.methods.approve(this.state.StakingContractAddress, AmountStaked).send({ from: this.state.account }).on('transactionHash', (hash) => {}).on('confirmation',(confirmationNumber) => { 
        this.state.StakingContract.methods.stake(AmountStaked).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })
    } else { window.alert('staking contract not live on this blockchain') }
  }

  Withdraw = (AmountToBeWithdrawn) => {
    if (this.state.stakingcontractdata === true) {
      this.state.lptoken.methods.approve(this.state.StakingContractAddress, AmountToBeWithdrawn).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.StakingContract.methods.withdrawAndReward(AmountToBeWithdrawn).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })
    } else {
      window.alert('staking contract not live on this blockchain')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ethBalance: '0',
      StakingContract: {},
      StakeTokenBalance: '0',
      loading: true,
      staketoken: {},
      staking: 'true',
      lptoken: {},
      LPTokenBalance: '0',
      rewardtoken: {},
      RewardTokenBalance: '0',
      StakingContractAddress: '',
      stakingcontractdata: true
    }
  }

  render() {
    let content

    content = <Main
      ethBalance={this.state.ethBalance}
      StakeTokenBalance={this.state.StakeTokenBalance}
      staking={this.state.staking}
      stake={this.stake}
      Withdraw={this.Withdraw}
      RewardTokenBalance={this.state.RewardTokenBalance}
      LPTokenBalance={this.state.LPTokenBalance}
      StakingContract={this.state.StakingContract}
      stakingcontractdata={this.state.stakingcontractdata}
    />


    return (
      <div className = 'secondDiv'>
        <div className="App secondDiv" >
          <Navbar account={this.state.account} />
          <header className="App-header">
            <main role='main' className='col-lg-12 d-flex ml-auto mr-auto' style={{ maxWidth: '600px' }}></main>
            <a
              className="App-link"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
            {content}
          </header>
          
        </div>
      </div>
    );

  }
}

export default App;
