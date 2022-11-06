//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract VendingMachine {
    mapping(address => uint) balances; // address => donuts
    address payable public  owner;

    constructor() {
        owner = payable(msg.sender);
        balances[address(this)] = 25;
    }

    //buying donuts
    function BuyDonuts(uint amount) public payable {
        require(msg.value > amount * 0.005 ether, "1 donut = 0.05 ethers");
        require(balances[address(this)] >= amount, "not enough donuts");

        balances[msg.sender] += amount;
        balances[address(this)] -= amount;
    }

    //eat your donuts and return how many are left;
    function Eat(uint amount) public {
        require(amount <= balances[msg.sender], "not enough donuts");
        balances[msg.sender] -= amount;
    }

    //refill vending machine;
    function Refill() public {
        require(owner == msg.sender, "only owner can refill");
        balances[address(this)] += 25;
    }

    //Check Vending machine balance;
    function donutsLeft() public view returns (uint) {
        return balances[address(this)];
    }

    //owner can withdraw his profits;
    function withdraw() public {
        require(owner == msg.sender, "only owner can withdraw");
        uint bal = address(this).balance;
        owner.transfer(bal);
    }

    //getYourBalance
    function MyDonuts() public view returns (uint) {
        return balances[msg.sender];
    }

}