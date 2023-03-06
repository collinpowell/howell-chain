//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

address payable constant feeAddress = payable(0x75280424f429feF999c56eb0C2CC2F9095c0Cf05);
contract Standard is ERC20{
    uint8 private decimal;
    constructor (string memory __name,string memory __symbol,uint256 _totalSupply,uint8 _decimal) payable  ERC20(__name, __symbol){
        require(msg.value > 0, 'Insufficient Funds');
        decimal = _decimal;
         feeAddress.transfer(msg.value);
         _mint(msg.sender, _totalSupply * (10 ** uint256(decimals())));
    }

    function decimals() public view virtual override returns (uint8) {
        return decimal;
    }
}

