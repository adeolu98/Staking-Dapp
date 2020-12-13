var LPToken = artifacts.require("LPToken");

module.exports = function(deployer) {
  deployer.deploy(LPToken);
};
