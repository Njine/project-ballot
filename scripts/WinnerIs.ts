import { viem } from "hardhat";
import { hexToString } from "viem";

async function queryWinner(contractAddress: string) {
    const ballotContract = await viem.attachContract("Ballot", contractAddress);
    const winner = await ballotContract.read.winnerName();
    const winnerName = hexToString(winner, { size: 32 });
    console.log(`Winning proposal is: ${winnerName}`);
}

const contractAddress = "0x772a4dcefe84b59a847b21b68c400cc7b06f19b3"; // Replace with your contract address

queryWinner(contractAddress).catch(console.error);
