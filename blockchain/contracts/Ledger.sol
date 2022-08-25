// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

/// @author Intertech's Twelve Team
contract Ledger {
    struct NamedReceiver {
        address addr;
        string nickname;
    }

    struct Account {
        address payable walletAddress;
        uint becomesAdultAt;
        uint balance;
        uint numReceivers;
        mapping(uint => NamedReceiver) receivers;
    }

    uint public totalTransfers;
    uint public totalTransferred;

    address systemOwner;
    address[] adminUsers;
    mapping(address => Account) accounts;

    /// You already have an account.
    error AccountAlreadyExists();
    /// There does not exist an account associated with this address.
    error NoAccountExists();
    /// This operation can only be perfomed by an adult.
    error NotAnAdult();
    /// You don't have enough balance.
    error NotEnoughBalance(uint balance);

    event Deposit(address indexed from, uint value);
    event Withdraw(address indexed owner, uint value);
    event Transfer(address indexed from, address indexed to, uint value);
    event BalanceChange(address indexed owner, uint balance);
    event ReceiverChange(address indexed owner, bool added, address receiver, string nickname);

    modifier onlyAdmins {
        require(isAdmin(), "Only admins can perform this action.");
        _;
    }

    modifier onlyAccountOwners {
        if (!isRegistered())
            revert NoAccountExists();
        _;
    }

    modifier onlyAdults {
        if (!isAdult())
            revert NotAnAdult();
        _;
    }

    constructor() {
        systemOwner = msg.sender;
        adminUsers.push(msg.sender);
    }

    /// Deposit ether to user account
    receive() external payable onlyAccountOwners onlyAdults { 
        deposit();
    }

    /// Deposit ether to user account
    function deposit() public payable onlyAccountOwners onlyAdults {
        Account storage account = accounts[msg.sender];
        account.balance += msg.value;

        emit Deposit(msg.sender, msg.value);
        emit BalanceChange(msg.sender, account.balance);
    }

    /// Withdraw ether from user account
    /// @param amount amount to withdraw
    function withdraw(uint amount) external onlyAccountOwners onlyAdults {
        Account storage account = accounts[msg.sender];
        if (account.balance < amount)
            revert NotEnoughBalance(account.balance);

        account.balance -= amount;
        account.walletAddress.transfer(amount);

        emit Withdraw(msg.sender, amount);
        emit BalanceChange(msg.sender, account.balance);
    }

    /// Transfer ether to some other account
    /// @param to address of the receiver account
    /// @param amount amount to transfer
    function send(address to, uint amount) external onlyAccountOwners onlyAdults {
        Account storage account = accounts[msg.sender];
        if (account.balance < amount)
            revert NotEnoughBalance(account.balance);
        
        if (accounts[to].walletAddress == address(0))
            revert NoAccountExists();

        account.balance -= amount;
        accounts[to].balance += amount;

        totalTransfers++;
        totalTransferred += amount;

        emit Transfer(msg.sender, to, amount);
        emit BalanceChange(msg.sender, account.balance);
        emit BalanceChange(to, accounts[to].balance);
    }

    /// As an admin user declare another user as admin
    /// @param addr address of the user to be declared as admin
    function addAdminUser(address addr) public onlyAdmins {
        for (uint i = 0; i < adminUsers.length; i++) {
            if (adminUsers[i] == addr)
                return;
        }

        adminUsers.push(addr);
    }

    /// Create an account
    /// @param becomesAdultAt date at which the user becomes an adult (in unix time)
    function createAccount(uint becomesAdultAt) public {
        if (accounts[msg.sender].walletAddress != address(0))
            revert AccountAlreadyExists();

        Account storage account = accounts[msg.sender];
        account.walletAddress = payable(msg.sender);
        account.becomesAdultAt = becomesAdultAt;
    }

    /// Add a registered receiver to your account so you won't have to enter their address every time
    /// @param receiver Address of the receiver
    /// @param nickname A nickname for the receiver (DANGER: This info will be publicly readable, choose wisely)
    function registerReceiver(address receiver, string calldata nickname) public onlyAccountOwners onlyAdults {
        Account storage account = accounts[msg.sender];
        account.receivers[account.numReceivers++] = NamedReceiver({addr: receiver, nickname: nickname});

        emit ReceiverChange(msg.sender, true, receiver, nickname);
    }

    /// Remove a registered receiver from your account
    /// @param receiver Address of the receiver to be removed
    function forgetReceiver(address receiver) public onlyAccountOwners onlyAdults {
        Account storage account = accounts[msg.sender];

        uint index = type(uint).max;
        for (uint i = 0; i < account.numReceivers; i++) {
            if (account.receivers[i].addr == receiver) {
                index = i;
                break;
            }
        }
        if (index > account.numReceivers - 1)
            revert NoAccountExists();

        emit ReceiverChange(msg.sender, false, receiver, account.receivers[index].nickname);

        account.numReceivers--;
        for (uint i = index; i < account.numReceivers; i++) {
            account.receivers[i] = account.receivers[i+1];
        }
    }

    /// Returns whether the user has an account
    function isRegistered() public view returns (bool) {
        return accounts[msg.sender].walletAddress != address(0);
    }

    /// Returns whether the requesting user is an admin
    function isAdmin() public view returns (bool) {
        for (uint i = 0; i < adminUsers.length; i++) {
            if (adminUsers[i] == msg.sender)
                return true;
        }
        return false;
    }

    /// Returns whether the requesting user is an adult
    function isAdult() public view onlyAccountOwners returns (bool) {
        return block.timestamp > accounts[msg.sender].becomesAdultAt;
    }

    /// Get receivers registered in your account
    /// @return List of tuples(address, string)
    function getReceivers() public view onlyAccountOwners onlyAdults returns (NamedReceiver[] memory) {
        Account storage account = accounts[msg.sender];
        NamedReceiver[] memory receivers = new NamedReceiver[](account.numReceivers);

        for (uint i = 0; i < receivers.length; i++) {
            receivers[i] = account.receivers[i];
        }

        return receivers;
    }

    /// @return Requesting user's account balance
    function getBalance() public view onlyAccountOwners returns (uint) {
        return accounts[msg.sender].balance;
    }

    /// @return Date at which the user becomes an adult (in unix time)
    function getAdultTime() public view onlyAccountOwners returns (uint) {
        return accounts[msg.sender].becomesAdultAt;
    }
}