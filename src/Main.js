import './App.css';
import Stake from './Stake.js';
import Withdraw from './Withdraw.js'
import React, { Component } from 'react';
import Web3 from 'web3';
import stakingContract from './stakingContract.json';
import Navbar from './Navbar.js';
import StakeToken from './StakeToken.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.js";


class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            staking: 'true',
            StakeBgColor: '',
            WithdrawBgColor: ''
        }
    }


    render() {
        let content
        if (this.state.staking === 'true') {
            content = <Stake
                ethBalance={this.props.ethBalance}
                StakeTokenBalance={this.props.StakeTokenBalance}
                stake={this.props.stake}
                staking={this.props.staking}
                LPTokenBalance = {this.props.LPTokenBalance}
                StakingContract =  {this.props.StakingContract}
            />
        } else {
            content = <Withdraw
                ethBalance={this.props.ethBalance}
                StakeTokenBalance={this.props.StakeTokenBalance}
                Withdraw = {this.props.Withdraw}
                staking={this.props.staking}
                RewardTokenBalance = {this.props.RewardTokenBalance}
                LPTokenBalance = {this.props.LPTokenBalance}
                StakingContract =  {this.props.StakingContract}
                
            />
        }

        return (

            <div className='card secondDiv'>




                <div className='card-body'>



                    <div className='cardbody'>

                        <button class=" stake-stake-btn btn-lg" onClick={(event) => { this.setState({ staking: 'true', StakeBgColor: 'lightgrey', WithdrawBgColor: 'white' }) }} style={{ backgroundColor: this.state.StakeBgColor }} >

                            <h6> STAKE </h6>
                        </button>
                        <button type="submit" class=" stake-withdraw-btn btn-lg" onClick={(event) => { this.setState({ staking: 'false', StakeBgColor: 'white', WithdrawBgColor: 'lightgrey' }) }} style={{ backgroundColor: this.state.WithdrawBgColor }}>
                            <h6>WITHDRAW</h6>
                        </button>
                    </div>
                    {content}
                </div>
            </div>
        );

    }
}

export default Main;
