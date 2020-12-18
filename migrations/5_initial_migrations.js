  
var StakingContract = artifacts.require("StakingContract");
const  LPToken = '0xDF17E2a61464F9571AB9082810821E412810bd0D'
const  RewardToken = '0x925213DCce96451Cb6ef329EF6175f2cB341CE65'
const  StakeToken =  '0x4e9327cA9b05656cfA9A4F86F08644eE0E90E314'


module.exports = function(deployer) {
  deployer.deploy(StakingContract,StakeToken, RewardToken, LPToken);
};