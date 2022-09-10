require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = 'panda inflict tank position speak basket uncover maximum cube expose loan divorce';

module.exports = {
  // rpc: {
  //   host:"127.0.0.2",
  //   port:8501
  // },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546, //8501
      network_id: "*" // Match any network id 7890
    },
    // kovan: {
    //   provider: () => new HDWalletProvider(MNEMONIC, "wss://kovan.infura.io/ws/v3/8b598e68b78e4f298a1e0680d1e840b6"),
    //   network_id: "42",
    //   skipDryRun: true,
    //   },
    
    // from: "0x7299185dFf2A9120809A9F06914579DC4290e15A", // use the account-id generated during the setup process
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
