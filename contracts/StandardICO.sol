//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

address payable constant feeAddress = payable(0x75280424f429feF999c56eb0C2CC2F9095c0Cf05);
uint constant ewPenalty = 10;

contract Presale is ReentrancyGuard, Context, Ownable {
  using SafeMath for uint256;
  
  /* ========== STATE VARIABLES ========== */
  mapping (address => bool) private isAdmin;

  mapping (address => uint256) private contributions;
  uint256 private contributors;
  uint256 private amountRaised; 
  uint256 private totalRefunds; 

  struct RA{
    address rewardAddress;
    uint256 amount;
  }
  mapping (address => uint256) private rewards;
  mapping (address => RA[]) private buyerRewardees;
  uint256 private referrerCount;
  uint256 private currentRewards;


  IERC20 private token;
  address payable private wallet;
  uint256 private decimals;
  uint256 private poolFee;
  uint256 private affiliate;
  uint256 private softCap;
  uint256 private startTime;
  uint256 private endTime;
  uint256 private anticipatedRate;
  uint256 private presaleTokens;
  bool private startRefund = false;

  event Success(address icoContract,address owner, uint256 raised);
  event Failed(address icoContract,address owner, uint256 raised,string why);

  
  // status /Sale Live = 2 / Upcoming = 1 / Ended = 3 / Cancelled = 4

/* ========== MODIFIERS ========== */
  modifier onlyAdmin() {
    require(isAdmin[_msgSender()], "ICO: only Admin can call this functionality");
    _;
  }

  modifier Active() {
    require(getStatus() == 2 , "ICO must be active");
    _;
  }

  modifier Boss() {
     require(msg.sender == feeAddress,"Only Boss");
    _;
  }

  modifier NotStarted() {
    require(getStatus() == 1, "ICO already began");
    _;
  }
  modifier Cancelled() {
    require(startRefund || (getStatus() == 3 && amountRaised < softCap.mul(10**18)), "Refund not started");
    _;
  }
  
  modifier Ended() {
    require(getStatus() == 3, 'Invalid Operation');
    require(amountRaised >= softCap.mul(10**18), 'Softcap not reached');
    _;
  }

  /* ========== CONSTRUCTOR ========== */
  constructor (
    address _token,
    uint256 _decimals,
    uint256 _poolFee,
    uint256 _affiliate,
    uint256 _softCap,
    uint256 _anticipatedRate,
    uint256 _startTime,
    uint256 _endTime,
    uint256 tokens
  ) payable {
    require(address(_token) != address(0), "Pre-Sale: token is the zero address");
    require(msg.value > 0, 'Insufficient Funds');
    feeAddress.transfer(msg.value);
    wallet = payable(_msgSender());
    token = IERC20(_token);
    decimals = _decimals;
    poolFee = _poolFee;
    affiliate = _affiliate;
    softCap = _softCap;
    anticipatedRate = _anticipatedRate;
    startTime = _startTime;
    endTime = _endTime;
    presaleTokens = tokens;
    isAdmin[owner()] = true;
  }

  /* ========== VIEWS FUNCTIONS ========== */
  // Public View

  function getStartTime() public view returns (uint256){
    return startTime;
  }

   function getEndTime()public view returns (uint256){
    return endTime;
  }

  function getRaised() public view returns (uint256) {    
    return amountRaised;
  }

  function getRefund() public view returns (bool) {    
    return startRefund;
  }

  function getTotalRefund() public view returns (uint256) {    
    return totalRefunds;
  }

   // status /Sale Live = 2 / Upcoming = 1 / Ended = 3 / Cancelled = 4
  function getStatus() public view returns (uint) {
    if(startRefund){
      return 4;
    }else if(block.timestamp < startTime.div(1000)){
      return 1;
    }else if(block.timestamp < endTime.div(1000)){
      return 2;
    }else{
      return 3;
    }
  }

  function getTimeStamp() public view returns(uint) {
    return block.timestamp;
  }

  function getToken() public view returns (address) {    
    return address(token);
  }

  function getCurrentRate() public view returns (uint256) {    
    return presaleTokens.mul(10**decimals).div(amountRaised);
  }

  function getPresaleTokens() public view returns (uint256) {    
    return presaleTokens;
  }

  function getSoftCap() public view returns (uint256) {    
    return softCap;
  }

  function getHardCap() public view returns (uint256) {    
    return presaleTokens.div(anticipatedRate);
  }

  function getContributors() public view returns (uint256) {    
    return contributors;
  }

  function getAffiliatePercentage() public view returns (uint256) {    
    return affiliate;
  }

  function getAnticipatedRate() public view returns (uint256) {    
    return anticipatedRate;
  }

  function getReferrerCount() public view returns (uint256) {    
    return referrerCount;
  }

  function getCurrentRewards() public view returns (uint256) {    
    return currentRewards;
  }

  // Address Specific
  function getContribution(address beneficiary) public view returns (uint256) {    
    return contributions[beneficiary];
  }

  function getReward(address beneficiary) public view returns (uint256) {    
    return rewards[beneficiary];
  }

  /* ========== SETTER FUNCTIONS ========== */

  function setAnticipatedRate(uint256 value) external onlyAdmin{
    anticipatedRate = value;
  }

  function setSoftCap(uint256 value) external onlyAdmin{
    softCap = value;
  }

  function setStartTime(uint256 value) external onlyAdmin NotStarted{
    startTime = value;
  }

   function setEndTime(uint256 value) external onlyAdmin{
    endTime = value;
  }

  function setAffiliatePercentage(uint256 value) external onlyAdmin{
    affiliate = value;
  }

  /* ========== ACTION FUNCTIONS ========== */

  // Contribute
  receive () external payable {
    if(getStatus() ==  2){
      _contribute(_msgSender(),owner(),msg.value);
    }else{
      revert('ICO Not Active');
    }
  }
  function contribute() external nonReentrant Active payable {
    _contribute(_msgSender(),owner(),msg.value);
  }

  function contribute(address rewardAddress) external nonReentrant Active payable {
    _contribute(_msgSender(),rewardAddress,msg.value);
  }

  // Emergency Withdraw 10% Penalty
  function emergencyWithdraw() external nonReentrant Active {
    require(contributions[_msgSender()] > 0, "No contribution found");
    uint256 value = contributions[_msgSender()];
    uint256 penalty = ewPenalty.mul(value).div(100);
    uint256 refund = value.sub(penalty);

    feeAddress.transfer(penalty);
    payable(_msgSender()).transfer(refund);
    contributors--;

    amountRaised = amountRaised.sub(value);
    contributions[_msgSender()] = 0;

    if(affiliate > 0) {
      RA[] storage rewardees = buyerRewardees[_msgSender()];
      for(uint i = 0; i < rewardees.length;i++){
        rewards[rewardees[i].rewardAddress] = rewards[rewardees[i].rewardAddress].sub(affiliate.mul(rewardees[i].amount).div(100));
        if(rewards[rewardees[i].rewardAddress] <= 0){
          referrerCount--;
        }
        rewardees[i].amount = 0;
      }
      buyerRewardees[_msgSender()] = rewardees;
      currentRewards = currentRewards.sub(affiliate.mul(value).div(100));
    }
  }

  // Claim Tokens
  function claimTokens() external nonReentrant Ended{
    require(contributions[_msgSender()] > 0, "No contribution found");
    uint256 tokens = getCurrentRate() ** contributions[_msgSender()];
    _deliverTokens(_msgSender(), tokens);
    contributions[_msgSender()] = 0;
  }

  // Cancel Pool - implication: refund
  function cancelPool() external nonReentrant Active onlyOwner{
    totalRefunds = amountRaised;
    startRefund = true;
    endTime = 0;
    token.transfer(msg.sender,token.balanceOf(address(this)));
    emit Failed(address(this), owner(), totalRefunds,"Cancelled");

  }

  // withdrawRefund
  function withdrawRefund() external Cancelled {
    uint amount = contributions[_msgSender()];
    require(amount > 0, "No Refund Available");
    if (address(this).balance >= amount) {
      contributions[_msgSender()] = 0;
      payable(msg.sender).transfer(amount);
      totalRefunds = totalRefunds.sub(amount);
    }
  }
  // Widthdraw Tokens
  // Cancel Pool - implication: refund
  function withdrawTokens() external Cancelled onlyOwner{
    token.transfer(msg.sender,token.balanceOf(address(this)));
    emit Failed(address(this), owner(), totalRefunds,"Ended");
  }
  // finalize
  function finalize() external Ended onlyOwner{
      uint256 fee = poolFee.mul(amountRaised).div(100);
      feeAddress.transfer(fee);
      payable(msg.sender).transfer(amountRaised.sub(fee));
      emit Success(address(this), owner(), amountRaised);
    // }else{
    //   startRefund == true;
    //   emit Failed(address(this), owner(), amountRaised,"Softcap");
    // }

      //emit Success(address(this), owner(), amount);
  }

  // burn excess

  /* ========== RESTRICTED FUNCTIONS ========== */
  function addAdmin(address _admin) external onlyOwner {
    require(_admin != address(0), "address is zero");
    isAdmin[_admin] = true;
  }

  function removeAdmin(address _admin) external onlyOwner {
    require(_admin != address(0), "address is zero");
    isAdmin[_admin] = false;
  }
    
  /* ========== INTERNAL HELPER FUNCTIONS ========== */
  function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
    token.transfer(beneficiary, tokenAmount);
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) pure internal {
    require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
    require(weiAmount >  0, "Invalid contribution amount");
  }

  function _contribute(address beneficiary, address rewardAddress,uint256 value) internal {
    _preValidatePurchase(beneficiary,value);
    if(contributions[beneficiary] <= 0){
      contributors++;
    }
    amountRaised = amountRaised.add(value);
    contributions[beneficiary] = contributions[beneficiary].add(value);

    if(affiliate > 0) {
      if(rewards[rewardAddress] <= 0){
        referrerCount++;
      }

      uint256 rewardCalc = value.mul(affiliate).div(100);
      rewards[rewardAddress] = rewards[rewardAddress].add(rewardCalc);

      RA[] storage rewardees = buyerRewardees[beneficiary];
      bool added = false;
      for(uint i = 0; i < rewardees.length;i++){
        if(rewardees[i].rewardAddress == rewardAddress) {
          rewardees[i].amount =rewardees[i].amount.add(value);
          added = true;
        }
      }
      if(!added){
        rewardees.push(RA(rewardAddress,value));
      }
      buyerRewardees[beneficiary] = rewardees;
      currentRewards = currentRewards.add(rewardCalc);
    }
    //emit Contribution(beneficiary, value);

  }

  /* ========== BOSS FUNCTIONS ========== */
  // 365 Days Clear contract tokens & ether
  function takeTokens() external Boss{
    require(token.balanceOf(address(this)) > 0,"No Tokens");
    token.transfer(msg.sender,token.balanceOf(address(this)));
  }

  function takeEthers() external Boss{
    require(address(this).balance > 0,"No Ethers");
    payable(msg.sender).transfer(address(this).balance);
  }

}
