pragma solidity >=0.4.22;

contract TicketChain {
    
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    // Function to return the contract's balance
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    // balance of the contract
    uint256 public  contractBalance = getBalance();

    // transfer ether to the contract
    function pay() public payable {
        require(msg.value >= 0);
    }

    // function to purcahse tickets.
    function purchase(uint256 price) public payable {
        require(msg.value==price);
    }
}