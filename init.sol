// use can't be evil and ERC1155 multipurpose NFT contract
// for security purposes this contract is in beta testing, not on the main net 
// on a server we will give access to artists who have generated Metadata URI
// find instructions on how to use IPFS elsewhere or email hello@fancradle.com
// for now we focus with the CBE-COMMERCIAL-NO-HATE license..
// In English, read here https://a16zcrypto.com/wp-content/uploads/2022/08/Cant-Be-Evil-Licenses.pdf
// Above goes in README.md file, well documented

// Non fungible - Not interchangeable for each other i.e. unique
// Typical ERC71 is the de-facto solution for NFTs, used for collectibles and games
// Of interest ERC1155 for multi-tokens, allowing this contract to 
// represent multiple fungible and NFTs, along with batched operations for increased gas efficiency



// contracts/DEComp.sol
// CBE-COMMERCIAL-NO-HATE
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {LicenseVersion, CantBeEvil} from "@a16z/contracts/licenses/CantBeEvil.sol";

contract DEComp is ERC1155, Ownable, CantBeEvil {
    uint256 public constant THIS_IS_NOT_A_TEST_B = 1;
    // free to use this music but fancradle retains commercial rights

    constructor() ERC1155("https://bafybeidlpe3agjgpan22aqv4iu54y7txhoairv5m3scg4iphyhkdcbfpx4.ipfs.nftstorage.link/", "TAB") CantBeEvil(LicenseVersion.PUBLIC) {  

    }

    function safeMint(address to, uint tokenId) public onlyOwner{
        _safeMint(msg.sender, THIS_IS_NOT_A_TEST_B);
    }

    // 
        // this contract inherits:
        // getLicenseURI() 
        // getLicenseName() from the CantBeEvil contract

}





