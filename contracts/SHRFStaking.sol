//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Staking is ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    /* ========== STATE VARIABLES ========== */
    IERC20 public stakingToken;

    struct record {
        uint256 stakeTime;
        uint256 stakeAmt;
        uint256 lastUpdateTime;
        uint256 accumulatedInterestToUpdateTime;
        uint256 amtWithdrawn;
    }
    mapping(address => record) public addressMap;
    mapping(uint256 => address) private addressStore;
    uint256 public stakingAddresses = uint256(0);
    uint256 public apr = uint256(5);
    uint256 public totalWithdrawals = uint256(0);
    uint256 private divisor = uint256(3_153_000_000_000);
    event Staked(address indexed account);
    event Unstaked(address indexed account);
    event Recieved(address indexed from,uint256 value);

    /* ========== CONSTRUCTOR ========== */
    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    receive() external payable {
        emit Recieved(_msgSender(),msg.value);
    }

    /* ========== VIEWS ========== */

    /**
     * Function totalStakedAmount
     * The function takes in 0 variables. It can be called by functions both inside and outside of this contract. It does the following :
     * creates an internal variable total with initial value 0
     * repeat stakingAddresses times with loop variable i :  (creates an internal variable thisRecord with initial value addressMap with element addressStore with element Loop Variable i; and then updates total as (total) + (thisRecord with element stakeAmt))
     * returns total as output
     */
    function totalStakedAmount() public view returns (uint256) {
        uint256 total = uint256(0);
        for (uint256 i = 0; i < stakingAddresses; i++) {
            record memory thisRecord = addressMap[addressStore[i]];
            total = (total + thisRecord.stakeAmt);
        }
        return total;
    }

    /**
     * Function totalAccumulatedInterest
     * The function takes in 0 variables. It can be called by functions both inside and outside of this contract. It does the following :
     * creates an internal variable total with initial value 0
     * repeat stakingAddresses times with loop variable i :  (updates total as (total) + (presentEarning with variable _address as addressStore with element Loop Variable i))
     * returns total as output
     */
    function totalAccumulatedInterest() public view returns (uint256) {
        uint256 total = uint256(0);
        for (uint256 i = 0; i < stakingAddresses; i++) {
            total = (total + presentEarning(addressStore[i]));
        }
        return total;
    }

    /**
     * Function presentEarning
     * The function takes in 1 variable, (an address) _address. It can be called by functions both inside and outside of this contract. It does the following :
     * creates an internal variable thisRecord with initial value addressMap with element _address
     * returns (thisRecord with element accumulatedInterestToUpdateTime) + (((thisRecord with element stakeAmt) * ((current time) - (thisRecord with element lastUpdateTime)) * (apr) * (10)) / (864)) as output
     */
    function presentEarning(address _address) public view returns (uint256) {
        record memory thisRecord = addressMap[_address];
        return (thisRecord.accumulatedInterestToUpdateTime +
            ((thisRecord.stakeAmt *
                (block.timestamp - thisRecord.lastUpdateTime) *
                apr) / divisor));
    }

    /**
     * Function stake
     * Daily Interest Rate : Variable apr
     * Address Map : addressMap
     * ERC20 Transfer : 0x33D512a749f6feFaDB832c91c0F23Bc27bE2E3d4, _stakeAmt
     * The function takes in 1 variable, (zero or a positive integer) _stakeAmt. It can be called by functions both inside and outside of this contract. It does the following :
     * checks that _stakeAmt is strictly greater than 0
     * creates an internal variable thisRecord with initial value addressMap with element the address that called this function
     * if (thisRecord with element stakeAmt) is equals to 0 then (updates addressMap (Element the address that called this function) as Struct comprising current time, _stakeAmt, current time, 0, 0; then updates addressStore (Element stakingAddresses) as the address that called this function; and then updates stakingAddresses as (stakingAddresses) + (1)) otherwise (updates addressMap (Element the address that called this function) as Struct comprising current time, ((thisRecord with element stakeAmt) + (_stakeAmt)), current time, ((thisRecord with element accumulatedInterestToUpdateTime) + (((thisRecord with element stakeAmt) * ((current time) - (thisRecord with element lastUpdateTime)) * (apr) * (10)) / (864))), (thisRecord with element amtWithdrawn))
     * calls ERC20's transferFrom function  with variable sender as the address that called this function, variable recipient as the address of this contract, variable amount as _stakeAmt
     * emits event Staked with inputs the address that called this function
     */
    function stake(uint256 _stakeAmt) external nonReentrant {
        require(
            (_stakeAmt > uint256(0)),
            "Staked amount needs to be greater than 0"
        );
        record memory thisRecord = addressMap[_msgSender()];
        if ((thisRecord.stakeAmt == uint256(0))) {
            addressMap[_msgSender()] = record(
                block.timestamp,
                _stakeAmt,
                block.timestamp,
                uint256(0),
                uint256(0)
            );
            addressStore[stakingAddresses] = _msgSender();
            stakingAddresses = (stakingAddresses + uint256(1));
        } else {
            addressMap[_msgSender()] = record(
                block.timestamp,
                (thisRecord.stakeAmt + _stakeAmt),
                block.timestamp,
                (thisRecord.accumulatedInterestToUpdateTime +
                    ((thisRecord.stakeAmt *
                        (block.timestamp - thisRecord.lastUpdateTime) *
                        apr) / divisor)),
                thisRecord.amtWithdrawn
            );
        }
        stakingToken.safeTransferFrom(_msgSender(), address(this), _stakeAmt);
        emit Staked(_msgSender());
    }

    /**
     * Function unstake
     * The function takes in 1 variable, (zero or a positive integer) _unstakeAmt. It can be called by functions both inside and outside of this contract. It does the following :
     * creates an internal variable thisRecord with initial value addressMap with element the address that called this function
     * checks that _unstakeAmt is less than or equals to (thisRecord with element stakeAmt)
     * creates an internal variable newAccum with initial value (thisRecord with element accumulatedInterestToUpdateTime) + (((thisRecord with element stakeAmt) * ((current time) - (thisRecord with element lastUpdateTime)) * (apr) * (10)) / (864))
     * creates an internal variable interestToRemove with initial value ((newAccum) * (_unstakeAmt)) / (thisRecord with element stakeAmt)
     * checks that (amount of native currency owned by the address of this contract) is greater than or equals to interestToRemove
     * transfers interestToRemove of the native currency to the address that called this function
     * checks that (ERC20's balanceOf function  with variable recipient as the address of this contract) is greater than or equals to _unstakeAmt
     * calls ERC20's transfer function  with variable recipient as the address that called this function, variable amount as _unstakeAmt
     * updates totalWithdrawals as (totalWithdrawals) + (interestToRemove)
     * if _unstakeAmt is equals to (thisRecord with element stakeAmt) then (repeat stakingAddresses times with loop variable i :  (if (addressStore with element Loop Variable i) is equals to (the address that called this function) then (updates addressStore (Element Loop Variable i) as addressStore with element (stakingAddresses) - (1); then updates stakingAddresses as (stakingAddresses) - (1); and then terminates the for-next loop)))
     * updates addressMap (Element the address that called this function) as Struct comprising (thisRecord with element stakeTime), ((thisRecord with element stakeAmt) - (_unstakeAmt)), (thisRecord with element lastUpdateTime), ((newAccum) - (interestToRemove)), ((thisRecord with element amtWithdrawn) + (interestToRemove))
     * emits event Unstaked with inputs the address that called this function
     */
    function unstake(uint256 _unstakeAmt) external nonReentrant {
        record memory thisRecord = addressMap[_msgSender()];
        require(
            (_unstakeAmt <= thisRecord.stakeAmt),
            "Withdrawing more than staked amount"
        );
        uint256 newAccum = (thisRecord.accumulatedInterestToUpdateTime +
            ((thisRecord.stakeAmt *
                (block.timestamp - thisRecord.lastUpdateTime) *
                apr) / divisor));
        uint256 interestToRemove = ((newAccum * _unstakeAmt) /
            thisRecord.stakeAmt);
        require(
            (address(this).balance >= interestToRemove),
            "Insufficient amount of native currency in this contract to transfer out. Please contact the contract owner to top up the native currency."
        );
        payable(_msgSender()).transfer(interestToRemove);
        require(
            (stakingToken.balanceOf(address(this)) >= _unstakeAmt),
            "Insufficient amount of the token in this contract to transfer out. Please contact the contract owner to top up the token."
        );
        stakingToken.transfer(_msgSender(), _unstakeAmt);
        totalWithdrawals = (totalWithdrawals + interestToRemove);
        if ((_unstakeAmt == thisRecord.stakeAmt)) {
            for (uint256 i = 0; i < stakingAddresses; i++) {
                if ((addressStore[i] == _msgSender())) {
                    addressStore[i] = addressStore[
                        (stakingAddresses - uint256(1))
                    ];
                    stakingAddresses = (stakingAddresses - uint256(1));
                    break;
                }
            }
        }
        addressMap[_msgSender()] = record(
            thisRecord.stakeTime,
            (thisRecord.stakeAmt - _unstakeAmt),
            thisRecord.lastUpdateTime,
            (newAccum - interestToRemove),
            (thisRecord.amtWithdrawn + interestToRemove)
        );
        emit Unstaked(_msgSender());
    }

    /**
     * Function withdrawReward
     * The function takes in 1 variable, (zero or a positive integer) _withdrawalAmt. It can only be called by functions outside of this contract. It does the following :
     * creates an internal variable totalInterestEarnedTillNow with initial value presentEarning with variable _address as the address that called this function
     * checks that _withdrawalAmt is less than or equals to totalInterestEarnedTillNow
     * creates an internal variable thisRecord with initial value addressMap with element the address that called this function
     * updates addressMap (Element the address that called this function) as Struct comprising (thisRecord with element stakeTime), (thisRecord with element stakeAmt), current time, ((totalInterestEarnedTillNow) - (_withdrawalAmt)), ((thisRecord with element amtWithdrawn) + (_withdrawalAmt))
     * checks that (amount of native currency owned by the address of this contract) is greater than or equals to _withdrawalAmt
     * transfers _withdrawalAmt of the native currency to the address that called this function
     * updates totalWithdrawals as (totalWithdrawals) + (_withdrawalAmt)
     */
    function withdrawReward(uint256 _withdrawalAmt) external nonReentrant {
        uint256 totalInterestEarnedTillNow = presentEarning(_msgSender());
        require(
            (_withdrawalAmt <= totalInterestEarnedTillNow),
            "Withdrawn amount must be less than withdrawable amount"
        );
        record memory thisRecord = addressMap[_msgSender()];
        addressMap[_msgSender()] = record(
            thisRecord.stakeTime,
            thisRecord.stakeAmt,
            block.timestamp,
            (totalInterestEarnedTillNow - _withdrawalAmt),
            (thisRecord.amtWithdrawn + _withdrawalAmt)
        );
        require(
            (address(this).balance >= _withdrawalAmt),
            "Insufficient amount of native currency in this contract to transfer out. Please contact the contract owner to top up the native currency."
        );
        payable(_msgSender()).transfer(_withdrawalAmt);
        totalWithdrawals = (totalWithdrawals + _withdrawalAmt);
    }

    /**
     * Function updateRecordsWithLatestInterestRates
     * The function takes in 0 variables. It can only be called by other functions in this contract. It does the following :
     * repeat stakingAddresses times with loop variable i :  (creates an internal variable thisRecord with initial value addressMap with element addressStore with element Loop Variable i; and then updates addressMap (Element addressStore with element Loop Variable i) as Struct comprising (thisRecord with element stakeTime), (thisRecord with element stakeAmt), current time, ((thisRecord with element accumulatedInterestToUpdateTime) + (((thisRecord with element stakeAmt) * ((current time) - (thisRecord with element lastUpdateTime)) * (apr) * (10)) / (864))), (thisRecord with element amtWithdrawn))
     */
    function updateRecordsWithLatestInterestRates() internal {
        for (uint256 i = 0; i < stakingAddresses; i++) {
            record memory thisRecord = addressMap[addressStore[i]];
            addressMap[addressStore[i]] = record(
                thisRecord.stakeTime,
                thisRecord.stakeAmt,
                block.timestamp,
                (thisRecord.accumulatedInterestToUpdateTime +
                    ((thisRecord.stakeAmt *
                        (block.timestamp - thisRecord.lastUpdateTime) *
                        apr) / divisor)),
                thisRecord.amtWithdrawn
            );
        }
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    /**
     * Function modifyapr
     * Notes for _apr : 10000 is one percent
     * The function takes in 1 variable, (zero or a positive integer) _apr. It can be called by functions both inside and outside of this contract. It does the following :
     * checks that the function is called by the owner of the contract
     * calls updateRecordsWithLatestInterestRates
     * updates apr as _apr
     */
    function modifyAPR(uint256 _apr) public onlyOwner {
        updateRecordsWithLatestInterestRates();
        apr = _apr;
    }

    /**
     * Function withdrawNativeCurrency
     * The function takes in 1 variable, (zero or a positive integer) _amt. It can be called by functions both inside and outside of this contract. It does the following :
     * checks that the function is called by the owner of the contract
     * checks that (amount of native currency owned by the address of this contract) is greater than or equals to _amt
     * transfers _amt of the native currency to the address that called this function
     */
    function withdrawNativeCurrency(uint256 _amt) public onlyOwner {
        require(
            (address(this).balance >= _amt),
            "Insufficient amount of native currency in this contract to transfer out. Please contact the contract owner to top up the native currency."
        );
        payable(_msgSender()).transfer(_amt);
    }
}
