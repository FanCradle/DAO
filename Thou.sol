pragma solidity ^0.8.13;
// SPDX-License-Identifier: MIT
// check README, if you are part of 333 Ventures. You will be registered via companies house

contract TINATB {
    address public owner; //333 Ventures
    uint256 public balance; 

    constructor() {
        owner = msg.sender;
    }

    receive() payable external {
        require(balance <= 314417987296, "Receivable limit hit");
        balance += msg.value;
    }

    function withdraw(uint amount, address payable destAddr) public {
        require(msg.sender == owner, "Only 333 Ventures representative can withdraw");
        require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount);
        balance -= amount; 
    }
}
