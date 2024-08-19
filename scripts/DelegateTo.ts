import { viem } from "hardhat";

async function delegateVote(contractAddress: string, toAddress: string) {
    const ballotContract = await viem.attachContract("Ballot", contractAddress);
    const tx = await ballotContract.write.delegate([toAddress]);
    console.log(`Vote delegated to ${toAddress}. Transaction hash: ${tx.hash}`);
}

const contractAddress = "0x772a4dcefe84b59a847b21b68c400cc7b06f19b3"; // Replace with your contract address
const toAddress = "0xDelegateAddressHere"; // Replace with the delegate's address

delegateVote(contractAddress, toAddress).catch(console.error);
