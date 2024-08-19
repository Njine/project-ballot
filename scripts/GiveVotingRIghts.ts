import { viem } from "hardhat";

async function giveVotingRights(contractAddress: string, voterAddress: string) {
    const ballotContract = await viem.attachContract("Ballot", contractAddress);
    const tx = await ballotContract.write.giveRightToVote([voterAddress]);
    console.log(`Voting rights given to ${voterAddress}. Transaction hash: ${tx.hash}`);
}

const contractAddress = "0x772a4dcefe84b59a847b21b68c400cc7b06f19b3"; // Replace with your contract address
const voterAddress = "0xYourVoterAddressHere"; // Replace with the voter's address

giveVotingRights(contractAddress, voterAddress).catch(console.error);
