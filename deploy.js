const fs = require ("fs");
const solc = require ("solc");
const Web3 = require ("web3");
const web3 = new Web3 (new Web3.providers.HttpProvider ("http://localhost:9545"));
const initialSupply = 10000;
const compiledContract = solc.compile (fs.readFileSync ("TicketChain.sol", "utf-8"), 1);
const abi = compiledContract.contracts[":TicketChain"].interface;
const bytecode = "0x" + compiledContract.contracts[":TicketChain"].bytecode;
const gasEstimate = web3.eth.estimateGas({ data: bytecode }) + 100000; 
const TicketChainContractFactory = web3.eth.contract (JSON.parse (abi));

let abi = '[{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
let TicketChainContractFactory = web3.eth.contract (abi); 
let TicketChainContractInstance = TicketChainContractFactory.at ("0xc2e552ea85e99dc502dc7d565bd59212b6051304"); 

const TicketChainInstance = TicketChainContractFactory.new (initialSupply, { 
  from: web3.eth.accounts[1], 
  data: bytecode, 
  gas: gasEstimate 
}, function (e, instance) { 
  // Note: called twice!
  console.log ("Callback");
  if (typeof instance.address !== "undefined") { 
    console.log ("Contract mined!");
    console.log ("Contract address: " + instance.address);
    console.log ("Contract transaction hash: " + instance.transactionHash);
    fs.writeFileSync ("address.txt", instance.address, "utf-8");
    fs.writeFileSync ("abi.json", abi, "utf-8");
  } else {
    console.log ("Contract not created"); 
  }
});
