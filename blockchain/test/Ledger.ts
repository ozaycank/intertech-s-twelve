import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Ledger contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshopt in every test.
    async function deployLedgerFixture() {
        const Ledger = await ethers.getContractFactory("Ledger");
        const [deployer, addr1, addr2, addr3] = await ethers.getSigners();

        const ledger = await Ledger.deploy();
        await ledger.deployed();

        return { Ledger, ledger, deployer, addr1, addr2, addr3 };
    }

    describe("Deployment", function () {
        it("Should set the deployer as an admin", async function () {
            const { ledger } = await loadFixture(deployLedgerFixture);
    
            expect(await ledger.isAdmin()).to.be.true;
        });

        it("Should not have any user registered initially", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);

            expect(await ledger.connect(addr1).isRegistered()).to.be.false;
        });
    });

    describe("Account Creation", function() {
        it("Should be able to register users", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);

            await expect(await ledger.connect(addr1).createAccount(0)).not.to.be.reverted;
        });

        it("Should not create an account if the user is already registered", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);

            await expect(ledger.connect(addr1).createAccount(0)).not.to.be.reverted;
            await expect(ledger.connect(addr1).createAccount(0)).to.be.revertedWithCustomError(ledger, "AccountAlreadyExists");
        });
    });
});