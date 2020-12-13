var StakingContract = artifacts.require("StakingContract");
const  LPToken = '0x7B53f7c1398c960ec1D1400A37Af2E9c6121308F'
const  RewardToken = '0xf4eac9aA182E85d3E08790310ed034679f86d71F'
const  StakeToken =  '0xcF2C92247dA9AF9cF49c32ff3CC4c15a4463222E'


module.exports = function(deployer) {
  deployer.deploy(StakingContract,StakeToken, RewardToken, LPToken);
};

