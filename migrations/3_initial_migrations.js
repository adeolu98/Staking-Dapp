var RewardToken = artifacts.require("RewardToken");

module.exports = function(deployer) {
  deployer.deploy(RewardToken);
};
