const Web3 = require('web3');
const network = "mainnet"
const address = "{Your Eth Address}"

const express = require('express');
const app = express();

app.use(express.json())
app.listen(process.env.PORT || 5001);

// use tip function if you have a folder you want to share with group

const tip = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
      )
    );
    // talk to this CONTRACT_ADDRESS = "0xfAe3c455e0a8b46Ce2052a331bcf45c0e02db9dd" 
    // send money and mint your file below passing a message
  //web3.eth.getTransactionCount(address).then(num => console.log(num))
  //web3.eth.getTransactionFromBlock
  web3.eth.getPastLogs({fromBlock:'16251194',address: address})
.then(res => {
  res.forEach(rec => {
    console.log(rec.blockNumber, rec.transactionHash, rec.topics);
  });
}).catch(err => console.log("getPastLogs failed", err));
}


//quickly mint and share for free!
const mint = async () => {
    const rarepress = new Rarepress();
    await rarepress.init({ host: `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`})
    let cid = await rarepress.fs.add("ipfs.io/ipfs/bafybeidlpe3agjgpan22aqv4iu54y7txhoairv5m3scg4iphyhkdcbfpx4")
    let token = await rarepress.token.create({
      type: "ERC721",
      metadata: {
        "name": "fancradle",
        "description": "This is a collection of Osana AD Music Loops as NFTs.",
        "domain": "fancradle.com",
        "classification": "entertainment",
        "genre": "afrobeats",
        "image": "/ipfs/" + cid
    }
    })
  
    await rarepress.fs.push(cid)
    await rarepress.fs.push(token.tokenURI)
    let receipt = await rarepress.token.send(token)
    console.log(`Check token at: https://rarible.com/token/${receipt.id}`)
    process.exit()
  }