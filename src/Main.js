import './App.css';
import Stake from './Stake.js';
import Withdraw from './Withdraw.js'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



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
                stakingcontractdata = {this.props.stakingcontractdata}
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
                stakingcontractdata = {this.props.stakingcontractdata}
                
            />
        }
 
        return (
            <div className=' card border border-dark rounded-lg shadow-lg p-3 mb-5 bg-white rounded card-props'>
                <div className='card-body'>
                        <button class=" stake-stake-btn btn-lg" onClick={(event) => { this.setState({ staking: 'true', StakeBgColor: 'lightgrey', WithdrawBgColor: 'white' }) }} style={{ backgroundColor: this.state.StakeBgColor }} >
                         <h6 style = {{fontSize: '1.8vw'}}> STAKE </h6>
                        </button>
                        <button type="submit" class=" stake-withdraw-btn btn-lg" onClick={(event) => { this.setState({ staking: 'false', StakeBgColor: 'white', WithdrawBgColor: 'lightgrey' }) }} style={{ backgroundColor: this.state.WithdrawBgColor }}>
                            <h6 style = {{fontSize: '1.8vw'}} >WITHDRAW</h6>
                        </button>
                    {content}
                </div>
            </div>
        );
    }
}

export default Main;
