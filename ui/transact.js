const contractAddress = "0xd81a545c6b3f721eb0d0021265e3e05e6b2ebfb6";

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/fc5e998502c54d4798f061255f972599"));
}

const Mimimia = web3.eth.contract(ABI);
const mimimia = Mimimia.at(contractAddress);

let includeSecret = mimimia.include.call("QmdwTXF7P9PEkauqxzprJZB6wTXXLbe6sbWbHmrVYaqmNF", 5000);
console.log(includeSecret);

let getSecrets = mimimia.data.call();
console.log(getSecrets);