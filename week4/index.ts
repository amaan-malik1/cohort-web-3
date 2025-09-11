pragma solidity ^ 0.8.0;

contract Counter{
    //declaring the variable 
    uint public count;

    constructor(){
        count = 0;
    }

    //increment the count
    function increment() {
        count += 1;
    }``

    //decrement
    function decrement() {
        count -= 1;
    }

    function getCount() public view returns(uint) {
        return count;
    }
}
