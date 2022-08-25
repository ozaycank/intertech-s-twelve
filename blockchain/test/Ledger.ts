import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { execPath } from "process";
import { assert, timeStamp } from "console";
import { Contract } from "ethers";

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

    describe("Account Creation", function () {
        it("Should be able to register users", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);

            await expect(await ledger.connect(addr1).createAccount(0)).not.to.be.reverted;
        });

        it("Should not create an account if the user is already registered", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);

            await expect(ledger.connect(addr1).createAccount(0)).not.to.be.reverted;
            await expect(ledger.connect(addr1).createAccount(0)).to.be.revertedWithCustomError(ledger, "AccountAlreadyExists");
        });

        it("Should return isRegistered method true for a register user", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            expect(await ledger.connect(addr1).isRegistered()).to.be.false;
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).isRegistered()).to.be.true;
        });

        it("Should be able to add register receiver", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            ledger.connect(addr2).createAccount(0);
            expect(await ledger.connect(addr1).getReceivers()).to.have.lengthOf(0);
            ledger.connect(addr1).registerReceiver(addr2.address, "kullanıcı");
            expect(await ledger.connect(addr1).getReceivers()).to.have.lengthOf(1);
        });

        it("Should get an error when trying to remove a receiver that is not registered", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getReceivers()).to.have.lengthOf(0);
            expect(await ledger.connect(addr2).isRegistered()).to.be.false;
            await expect(ledger.connect(addr1).forgetReceiver(addr2.address)).to.be.revertedWithCustomError(ledger, "NoAccountExists");
        });

        it("Should be able to remove register", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            ledger.connect(addr2).createAccount(0);
            expect(await ledger.connect(addr1).getReceivers()).to.have.lengthOf(0);
            ledger.connect(addr1).registerReceiver(addr2.address, "kullanıcı");
            expect(await ledger.connect(addr1).getReceivers()).to.have.lengthOf(1);
            ledger.connect(addr2).forgetReceiver(addr2.address);
            expect(await ledger.connect(addr2).getReceivers()).to.have.lengthOf(0);
        });

        it("Should be able to check when they become an adult", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            const unixTimeNow = Math.floor(Date.now() / 1000) + 1;
            ledger.connect(addr1).createAccount(unixTimeNow);
            expect(await ledger.connect(addr1).isAdult()).to.be.false;
            expect(await ledger.connect(addr1).getAdultTime()).to.equal(unixTimeNow);
            await new Promise(r => setTimeout(r, 1000));
            expect(await ledger.connect(addr1).isAdult()).to.be.false;
        });

        it("Should be able to check whether they are adult or not", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).isAdult()).to.be.true;
        });

    });

    describe("Money Transfers", function () {
        it("Should be able to check their balance", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
        });

        it("Should be able to deposit an arbitary amount of money to their account", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            ledger.connect(addr1).deposit({ value: "10000000" });
            expect(await ledger.connect(addr1).getBalance()).to.equal("10000000");
        });

        it("Should not be able to withdraw an arbitary amount of money to their  initially account", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            await expect(ledger.connect(addr1).withdraw("8")).to.be.revertedWithCustomError(ledger, "NotEnoughBalance");
        });

        it("Should be able to send money to other users", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            ledger.connect(addr2).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            ledger.connect(addr1).deposit({ value: "10000000" });
            expect(await ledger.connect(addr1).send(addr2.address, "200"));
            expect(await ledger.connect(addr2).getBalance()).to.equal("200");
        });

        it("Should not be able to send money to not existing  users", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            ledger.connect(addr1).deposit({ value: "10000000" });
            await expect(ledger.connect(addr1).send(addr2.address, "200")).to.be.revertedWithCustomError(ledger, "NoAccountExists");
        });

        it("Adult users should be able to withdraw money from their accounts", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            ledger.connect(addr1).deposit({ value: "10" });
            ledger.connect(addr1).withdraw("5");
            expect(await ledger.connect(addr1).getBalance()).to.equal("5");
        });

        it("Non-adult users should not be able to deposit, withdraw or send any money", async function () {
            const { ledger, addr1, addr2 } = await loadFixture(deployLedgerFixture);
            const unixTimeNow = Math.floor(Date.now() / 1000) + 1;
            ledger.connect(addr1).createAccount(unixTimeNow);
            ledger.connect(addr2).createAccount(0);
            expect(await ledger.connect(addr1).isAdult()).to.be.false;
            expect(await ledger.connect(addr1).getAdultTime()).to.equal(unixTimeNow);
            expect(ledger.connect(addr1).deposit({ value: "5" })).not.to.be.reverted;
            expect(ledger.connect(addr1).withdraw("5")).not.to.be.reverted;
            expect(ledger.connect(addr1).send(addr2.address, "200")).to.be.revertedWithCustomError(ledger, 'NotAnAdult');
        });

        it("Users should not be able to withdraw more money than their balance allows", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).getBalance()).to.equal(0);
            ledger.connect(addr1).deposit({ value: "5" });
            expect(await ledger.connect(addr1).getBalance()).to.equal(5);
            ledger.connect(addr1).withdraw("10");
            expect(await ledger.connect(addr1).getBalance()).to.be.revertedWithCustomError(ledger, "NotEnoughBalance");
        });
    });

    describe("Admin Operations", function () {
        it("Should be able to check whether they are admin or not", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).isAdmin()).to.be.false;
        });

        it("Users should be able to add other users as admins", async function () {
            const { ledger, addr1 } = await loadFixture(deployLedgerFixture);
            ledger.connect(addr1).createAccount(0);
            expect(await ledger.connect(addr1).isAdmin()).to.be.false;
            ledger.addAdminUser(addr1.address);
            expect(await ledger.connect(addr1).isAdmin()).to.be.true;
        });
    });
});

