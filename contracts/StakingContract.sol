pragma solidity^ 0.4.26;

import "./IERC20.sol";


contract stakingContract {
    IERC20 public staketokenAdd;
    IERC20 public lptokenAdd;
    IERC20 public rewardtokenAdd;
    uint StakeTokenBal;
    uint totalLPbal;
    uint RewardTokenBal;
    address stakingContractAdd = address(this);
    uint lptokenBalOfSender;
    uint amountStaked;
    uint interest;
    uint StakingStarts; 
    uint timeOfStaking;
    uint timeOfWithdrawal;
    uint unclaimedTokens;
    uint withdrawalAmount;
    uint decimals = 10**18;
    event Withdraw (address);
    event Stake (address);

    constructor(IERC20 _StakeToken, IERC20 _RewardToken, IERC20 _LPToken) public{
        staketokenAdd =_StakeToken;
        rewardtokenAdd = _RewardToken;
        lptokenAdd = _LPToken;

    }

    function getStakeTokenBalofContract() public  returns(uint){
        return StakeTokenBal= staketokenAdd.balanceOf(stakingContractAdd);
        
    }
    
    function getLPTokenBalofContract() public  returns(uint){
        return totalLPbal = lptokenAdd.balanceOf(stakingContractAdd);
    }
    
    
    function getRewardTokenBalofContract() public  returns(uint){
      return  RewardTokenBal = rewardtokenAdd.balanceOf(stakingContractAdd);
    }
    
    
    // call to get the amount staked
    function getStakedAmount() public view returns(uint){
        return amountStaked;
    }
    
    
    
    function timeOfstaking() public  returns (uint) {
        return timeOfStaking = now;
    }
     
    function stake(uint _amountStaked) public {
        
        amountStaked = _amountStaked;
        
        // get the stake token bal of contract before receiving a stake
        
       
        // transfer the stake token to the staking contract 
        staketokenAdd.transferFrom(msg.sender, address(this), amountStaked);
        
        //send lp tokens to the function caller. the lp tokens are evidence of amount of tokens staked.
        lptokenAdd.transfer(msg.sender, amountStaked);

        
        //time tokens were staked  
        timeOfStaking = stakingContract.timeOfstaking();

        emit Stake(msg.sender);
        

    } 
    
    
    function withdrawAndReward( uint _withdrawalAmount) public{ 
         
        withdrawalAmount = _withdrawalAmount;
        
        
         //make sure lptokenBalOfSender is greater or less than the withdrawalAmount
        require(withdrawalAmount <= lptokenAdd.balanceOf(msg.sender), 'withdrawal amount too large, larger than your staked tokens');
        
        
        //transfer lptoken to the contract
        
        lptokenAdd.transferFrom(msg.sender, address(this), withdrawalAmount);
        
        // transfer staked tokens back to owner 
    
        staketokenAdd.transfer(msg.sender, withdrawalAmount);
        
        //get the time withdrawal is initiated; 
        timeOfWithdrawal = now;
        
        // calculate interest to be paid as reward tokens
        
        
        interest = withdrawalAmount/100;
        
        //transfer reward tokens to owner, they serve as interest on the Stake
        
        //tranfer reward token due to the caller 
        
        
        rewardtokenAdd.transfer(msg.sender, interest);
        
        // get the amount of tokens left unclaimed after Staking
        
        unclaimedTokens = amountStaked - withdrawalAmount;  
        emit Withdraw(msg.sender);
    }
    
      
}