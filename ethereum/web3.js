const { Web3 } = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  //   window.ethereum.request({ method: "eth_requestAccounts" });
  //   web3 = new Web3(window.ethereum);
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/b88aab9496d2456cb1e0a931c70ea8bd");
  web3 = new Web3(provider);
}

export default web3;
