require('dotenv').config();
const { ethers } = require('ethers');
const { connectDB, Wallet } = require('./db');
const abi = require('./abi.json'); // Make sure abi.json is present

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

async function handleEvent(type, address, amount, txHash) {
  const amountInEth = parseFloat(ethers.formatEther(amount));
  let wallet = await Wallet.findOne({ wallet_address: address });

  if (!wallet) {
    wallet = new Wallet({
      wallet_address: address,
      latest_balance: amountInEth,
      events: []
    });
  }

  wallet.latest_balance = amountInEth;
  wallet.events.push({
    type,
    amount: amountInEth,
    txHash,
    timestamp: new Date()
  });

  await wallet.save();
  console.log(`${type.toUpperCase()} | ${address} | ${amountInEth} ETH`);
}

async function main() {
  await connectDB();

  contract.on('Deposit', async (from, amount, event) => {
    await handleEvent('deposit', from, amount, event.transactionHash);
  });

  contract.on('Withdrawal', async (to, amount, event) => {
    await handleEvent('withdrawal', to, amount, event.transactionHash);
  });

  console.log('Listening for Deposit and Withdrawal events...');
}

main();
