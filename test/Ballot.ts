/*
import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function deployContract() {
    const publicClient = await viem.getPublicClient();
    const [deployer, otherAccount] = await viem.getWalletClients();
    const ballotContract = await viem.deployContract("Ballot", [
        PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    ]);
    return { publicClient, deployer, otherAccount, ballotContract };
}

describe("Ballot", () => {
    describe("when the contract is deployed", () => {
        it("has the provided proposals", async () => {
            const { ballotContract } = await loadFixture(deployContract);
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.read.proposals([BigInt(index)]);
                expect(hexToString(proposal[0], { size: 32 })).to.eq(PROPOSALS[index]);
            }
        });

        it("has zero votes for all proposals", async () => {
            const { ballotContract } = await loadFixture(deployContract);
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.read.proposals([BigInt(index)]);
                expect(proposal[1]).to.eq(0n);
            }
        });

        it("sets the deployer address as chairperson", async () => {
            const { ballotContract, deployer } = await loadFixture(deployContract);
            const chairperson = await ballotContract.read.chairperson();
            expect(chairperson.toLowerCase()).to.eq(deployer.account.address);
        });

        it("sets the voting weight for the chairperson as 1", async () => {
            const { ballotContract } = await loadFixture(deployContract);
            const chairperson = await ballotContract.read.chairperson();
            const chairpersonVoter = await ballotContract.read.voters([chairperson]);
            expect(chairpersonVoter[0]).to.eq(1n);
        });
    });

    describe("when the chairperson interacts with the giveRightToVote function", () => {
        it("gives right to vote for another address", async () => {
            const { ballotContract, deployer, otherAccount } = await loadFixture(deployContract);
            await ballotContract.write.giveRightToVote(otherAccount.account.address);
            const voter = await ballotContract.read.voters([otherAccount.account.address]);
            expect(voter[0]).to.eq(1n);
        });
    
        it("cannot give right to vote for someone that has voted", async () => {
            const { ballotContract, deployer, otherAccount } = await loadFixture(deployContract);
            await ballotContract.write.giveRightToVote(otherAccount.account.address);
            await ballotContract.write.connect(otherAccount).vote(0); // Other account votes
            await expect(ballotContract.write.giveRightToVote(otherAccount.account.address)).to.be.revertedWith("The voter already voted.");
        });
    
        it("cannot give right to vote for someone that already has voting rights", async () => {
            const { ballotContract, deployer, otherAccount } = await loadFixture(deployContract);
            await ballotContract.write.giveRightToVote(otherAccount.account.address);
            await expect(ballotContract.write.giveRightToVote(otherAccount.account.address)).to.be.revertedWith("The voter already voted.");
        });
    });

    describe("when the voter interacts with the vote function", () => {
        it("should register the vote", async () => {
            const { ballotContract, deployer, otherAccount } = await loadFixture(deployContract);
            await ballotContract.write.giveRightToVote(otherAccount.account.address);
            await ballotContract.write.connect(otherAccount).vote(0);
            const proposal = await ballotContract.read.proposals([BigInt(0)]);
            expect(proposal[1]).to.eq(1n); // Proposal 1 should have 1 vote
        });
    });

    describe("when the voter interacts with the delegate function", () => {
        it("should transfer voting power", async () => {
            const { ballotContract, deployer, otherAccount } = await loadFixture(deployContract);
            await ballotContract.write.giveRightToVote(otherAccount.account.address);
            await ballotContract.write.connect(otherAccount).delegate(deployer.account.address);
            const delegateVoter = await ballotContract.read.voters([deployer.account.address]);
            expect(delegateVoter[0]).to.eq(2n); // Deployer should have 2 weight
        });
    });

    describe("when an account other than the chairperson interacts with giveRightToVote", () => {
        it("should revert", async () => {
            const { ballotContract, otherAccount } = await loadFixture(deployContract);
            await expect(ballotContract.connect(otherAccount).giveRightToVote(otherAccount.account.address)).to.be.revertedWith("Only chairperson can give right to vote.");
        });
    });

    describe("when an account without right to vote interacts with the vote function", () => {
        it("should revert", async () => {
            const { ballotContract, otherAccount } = await loadFixture(deployContract);
            await expect(ballotContract.connect(otherAccount).vote(0)).to.be.revertedWith("Has no right to vote");
        });
    });

    describe("when someone interacts with the winningProposal function before any votes are cast", () => {
        it("should return 0", async () => {
            const { ballotContract } = await loadFixture(deployContract);
            const winningProposal = await ballotContract.read.winningProposal();
            expect(winningProposal).to.eq(0n);
        });
    });

    describe("when someone interacts with the winnerName function before any votes are cast", () => {
        it("should return name of proposal 0", async () => {
            const { ballotContract } = await loadFixture(deployContract);
            const winnerName = await ballotContract.read.winnerName();
            expect(hexToString(winnerName, { size: 32 })).to.eq(PROPOSALS[0]);
        });
    });
});
*/