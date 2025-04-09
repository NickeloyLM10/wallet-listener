// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WalletContract {
    event Deposit(address indexed from, uint amount);
    event Withdrawal(address indexed to, uint amount);

    function deposit() public payable {
        require(msg.value > 0, "Invalid Amount");

        msg.sender.call{value: msg.value};
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint amount) public {
        require(address(this).balance >= amount, "Not enough ETH in contract");
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}