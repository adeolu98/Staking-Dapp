  
var StakingContract = artifacts.require("StakingContract");
const  LPToken = '0xb89571643D92ec85DCB20b397DD28E1166107c42'
const  RewardToken = '0xCf825f35c4eDB34089cEaeFAddcE5aAB02ec7c94'
const  StakeToken =  '0x90c7Aa3D4D8fE3e4C869E55F7011C579f00e3b0e'


module.exports = function(deployer) {
  deployer.deploy(StakingContract,StakeToken, RewardToken, LPToken);
};