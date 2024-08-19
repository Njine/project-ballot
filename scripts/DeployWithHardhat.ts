import { viem } from "hardhat";
import { toHex, hexToString } from "viem";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.INFURA_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

const PROPOSALS = ["Rock", "Paper", "Scissors"];

async function main() {
    console.log("Proposals: ");
    PROPOSALS.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    console.log("\nDeploying Ballot contract");
    const ballotContract = await viem.deployContract("Ballot", [
        PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    ]);
    console.log("Ballot contract deployed to:", ballotContract.address);

    console.log("Proposals: ");
    for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.read.proposals([BigInt(index)]);
        const name = hexToString(proposal[0], { size: 32 });
        console.log({ index, name, proposal });
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});