var StakeToken = artifacts.require("StakeToken");

module.exports = function(deployer) {
  deployer.deploy(StakeToken);
};
