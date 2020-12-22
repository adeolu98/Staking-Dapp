import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.js';



class Stake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stakeAmount: '0'
    }
  }

  render() {
    return (

                  <div class="">
                    <h6> <p className = 'token-declaration-text'>       You have {window.web3.utils.fromWei(this.props.LPTokenBalance, 'Ether')} STK tokens staked</p></h6>
                    <form onSubmit={(event) => {
                      event.preventDefault()
                      let AmountStaked
                      AmountStaked = window.web3.utils.toWei(this.state.stakeAmount, 'Ether')
                      this.props.stake(AmountStaked)

                      if (this.props.stakingcontractdata === true) {
                        this.props.StakingContract.events.allEvents()
                          .on('data', (event) => {
                            window.location.reload()
                          })
                          .on('error', console.error);
                      }
                      else { }
                    }}>
                      <div class="form-group" style={{ marginTop: 0 }}>
                        <label for="exampleInputNumber"> STAKE Token </label>
                        <span class='float-right text-muted'>
                          You have {window.web3.utils.fromWei(this.props.StakeTokenBalance, 'Ether')}  Stake Tokens
                    </span>
                        <input type="number" min='0' class="form-control" aria-describedby="emailHelp" onChange={(event) => {
                          const stakeAmount = this.input.value.toString()
                          this.setState({ stakeAmount: stakeAmount })
                        }}
                          ref={(input) => { this.input = input }} placeholder={this.state.stakeAmount.toString()}
                        />


                        <small id="emailHelp" class="form-text text-muted">
                          How many tokens do you want to stake?
                    </small>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">LP Tokens</label>
                        <span className='float-right text-muted'>
                          You have {window.web3.utils.fromWei(this.props.LPTokenBalance, 'Ether')} LP Tokens
                    </span>
                        <input type="number" class="form-control" aria-describedby="ethToPay" onChange={(event) => {
                          const LPTokenAmount = this.input2.value.toString()
                          this.setState({ stakeAmount: LPTokenAmount })
                        }}
                          ref={(input) => { this.input2 = input }}
                          placeholder={this.state.stakeAmount.toString()} disabled />

                        <small id="ethToPay"> You will get {this.state.stakeAmount} LP tokens if you stake {this.state.stakeAmount} stk tokens. LP tokens are evidence that you have participated in this pool.  </small>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="submit" class=" stakenow-btn btn-lg " >STAKE
                        NOW
                    </button>
                      </div>
                    </form>
                  </div>
           
    );
  }
}

export default Stake;