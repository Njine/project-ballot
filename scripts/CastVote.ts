import { viem } from "hardhat";
import { toHex, hexToString } from "viem";

async function main() {
    const contractAddress = process.argv[2];
    const proposalIndex = process.argv[3];

    if (!contractAddress || !proposalIndex) {
        throw new Error("Contract address and proposal index must be provided");
    }

    const publicClient = await viem.getPublicClient();
    const voter = await viem.getWalletClients();

    const hash = await voter.writeContract({
        address: contractAddress,
        abi: /* ABI of your contract */,
        functionName: "vote",
        args: [BigInt(proposalIndex)],
    });

    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Transaction confirmed:", receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});