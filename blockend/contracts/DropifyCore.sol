
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interface/IMailbox.sol";
error NotAuthorizedCrosschain(uint32 _chain, address caller);

contract DropifyCore {


    mapping(uint32=>address) public crosschainDeployments;

    IMailbox immutable mailbox;
    constructor(IMailbox _mailbox) {
        mailbox=_mailbox;
    }
    modifier onlyAuthorizedCrosschain(address _caller, uint32 _chain){
        if(crosschainDeployments[_chain] != _caller) revert NotAuthorizedCrosschain(_chain, _caller);
        _;
    }
modifier onlyMailbox() {
    require(
        msg.sender == address(mailbox),
        "MailboxClient: sender not mailbox"
    );
    _;
}

    function setCrosschainDeployments(uint32[] memory selectors, address[] memory addresses) external {
        for(uint i=0; i < selectors.length; i++) crosschainDeployments[selectors[i]] = addresses[i];
    }


    event TestMessageSent(bytes32 messageId, string message, uint32 chainSelector);

    function sendTestMessage(string memory _message, uint32 _chainSelector) external payable{
        uint256 fee = mailbox.quoteDispatch(_chainSelector, addressToBytes32(crosschainDeployments[_chainSelector]), bytes(_message));
        bytes32 messageId = mailbox.dispatch{value: fee}(
                _chainSelector,
                addressToBytes32(crosschainDeployments[_chainSelector]),
                bytes(_message)
        );
        emit TestMessageSent(messageId, _message, _chainSelector);
    }

    function quoteDispatch(
    uint32 destinationDomain,
    address recipientAddress,
    string memory messageBody
    ) external view returns (uint256 fee) {

    bytes32 bytes32Recipient = addressToBytes32(recipientAddress);
    return mailbox.quoteDispatch(destinationDomain, bytes32Recipient, bytes(messageBody));

}
event ReceivedMessage(uint32 origin, bytes32 sender, uint256 value, bytes data);
function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _data
) external payable  {
    emit ReceivedMessage(_origin, _sender, msg.value, _data);
}

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
}


}
