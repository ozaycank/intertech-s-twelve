import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'
import "@nomicfoundation/hardhat-chai-matchers";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

export default config;