import { viem } from "hardhat";

async function castVote(contractAddress: string, proposalIndex: number) {
    const ballotContract = await viem.attachContract("Ballot", contractAddress);
    const tx = await ballotContract.write.vote([BigInt(proposalIndex)]);
    console.log(`Vote cast for proposal ${proposalIndex}. Transaction hash: ${tx.hash}`);
}

const contractAddress = "0x772a4dcefe84b59a847b21b68c400cc7b06f19b3"; // Replace with your contract address
const proposalIndex = 0; // Replace with the index of the proposal you want to vote for

castVote(contractAddress, proposalIndex).catch(console.error);
