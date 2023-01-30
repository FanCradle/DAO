const express = require('express');
const app = express();

const ContractABI = require('./build/contracts/abi.json'); 
const Contract_Address = "0xfAe3c455e0a8b46Ce2052a331bcf45c0e02db9dd"

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});

// initialise tip function
// Retrieve the contract instance from hosted json
const contract = new web3.eth.Contract(ContractABI, Contract_Address);
  
// Set up the transaction parameters
const fromAddress = "0xyour_address"; // Your Ethereum address
const privateKey = "0xyour_private_key"; // Your private key
const toAddress = Contract_Address;
const value = web3.utils.toWei("1", "ether"); // 1 ether in wei
const gasLimit = 21000;
const gasPrice = web3.utils.toWei("10", "gwei"); // 10 gwei in wei

// Build the transaction object
const tx = {
  from: fromAddress,
  to: toAddress,
  value: value,
  gas: gasLimit,
  gasPrice: gasPrice
};

// Sign the transaction using the private key
const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);

// Send the signed transaction
web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
  .on("transactionHash", (hash) => {
    console.log(`Transaction hash: ${hash}`);
  })
  .on("receipt", (receipt) => {
    console.log(`Transaction receipt: ${JSON.stringify(receipt)}`);
  })
  .on("error", (error) => {
    console.error(`Transaction error: ${error.message}`);
  });
