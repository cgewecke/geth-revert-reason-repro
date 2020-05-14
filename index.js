
/*

// SOLIDITY SOURCE

pragma solidity ^0.5.1;

contract A {
    uint x;

    function add(bool shouldRevert) public returns (uint) {
      require(shouldRevert, "this is a revert reason...");
      x++;
      return x;
    }
}
*/

const Web3 = require('web3');

const abi = [{
  "constant": false,
  "inputs": [{ "name": "shouldRevert", "type": "bool" }],
  "name": "add",
  "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

// Compiled with 0.5.16
const bytecode = "0x608060405234801561001057600080fd5b5061014f806100206000396000f3fe608060405234801561001057600080fd5b5060043610610048576000357c0100000000000000000000000000000000000000000000000000000000900480636f29a8531461004d575b600080fd5b61007b6004803603602081101561006357600080fd5b81019080803515159060200190929190505050610091565b6040518082815260200191505060405180910390f35b6000811515610108576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f7468697320697320612072657665727420726561736f6e2e2e2e00000000000081525060200191505060405180910390fd5b6000808154809291906001019190505550600054905091905056fea165627a7a72305820aa707da2aa17a6b2ad637e25aaef3d59d19810518691c1d8749a1f50b0e117a50029";

async function main(){
  const web3 = new Web3("http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);
  const options = {
    gas: 4000000,
    gasPrice: 1,
    data: bytecode
  }

  const deployed = await contract.deploy(options).send({from: accounts[0]});

  // instance.methods.add(false)
  const revertPayload = {
    jsonrpc: "2.0",
    id: 1000,
    method: "eth_call",
    params: [
      {
        from: accounts[0],
        to: deployed.options.address,
        data: "0x6f29a8530000000000000000000000000000000000000000000000000000000000000000",
      },
      "latest"
    ]
  };

  // instance.methods.add(true)
  const successPayload = {
    jsonrpc: "2.0",
    id: 1001,
    method: "eth_call",
    params: [
      {
        from: accounts[0],
        to: deployed.options.address,
        data: "0x6f29a8530000000000000000000000000000000000000000000000000000000000000001",
      },
      "latest"
    ]
  };


  const successResult = await new Promise(resolve => {
    web3.currentProvider.send(successPayload, (err, res) => {
      resolve(res);
    })
  })

  const revertResult = await new Promise(resolve => {
    web3.currentProvider.send(revertPayload, (err, res) => {
      resolve(res);
    })
  })

  console.log('success result: ' + JSON.stringify(successResult, null, ' '));
  console.log('revert result: ' + JSON.stringify(revertResult, null, ' '));

  console.log('Stopping geth client....');
}

main()
  .then(() =>  process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1)
  });

