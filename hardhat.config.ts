import { task, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.viem.getWalletClients();
  for (const account of accounts) {
    console.log(account.account.address);
  }
});

const privateKey = process.env.PRIVATE_KEY || ""; // Set a default value if PRIVATE_KEY is undefined
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
      sepolia: {
          url: "https://ethereum-sepolia-rpc.publicnode.com",
          accounts: [privateKey], // Use the defined privateKey variable
      },
  },
};

export default config;
