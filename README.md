# Web3 Wallet Listener – Blockchain Event Sync

A backend service that listens to on-chain deposit and withdrawal events on Ethereum (Sepolia testnet) and updates an off-chain MongoDB database accordingly.

## 🔗 Smart Contract
- **Address**: `0x40Fb5edf57cfC5401b8e1D36DDa1101aD416F39c`
- **Network**: Sepolia Testnet

---

## 🚀 Deployment
- Listener is deployed as a background worker on [Railway](https://railway.app)
- It runs continuously and listens for events from the contract.
- Logs:
Starting Container

Connected to MongoDB

Listening for Deposit and Withdrawal events...

DEPOSIT | 0xaAb24371391FfA3dC82A6927f38a6bdCe81cB3C0 | 1e-18 ETH

WITHDRAWAL | 0xaAb24371391FfA3dC82A6927f38a6bdCe81cB3C0 | 0 ETH

WITHDRAWAL | 0xaAb24371391FfA3dC82A6927f38a6bdCe81cB3C0 | 1e-18 ETH

DEPOSIT | 0xaAb24371391FfA3dC82A6927f38a6bdCe81cB3C0 | 1e-18 ETH

---

## 🧠 Architecture Overview

- **Solidity Smart Contract** deployed on Sepolia.
- **Events emitted**: `Deposit(address, uint)` and `Withdrawal(address, uint)`
- **Node.js Listener** using `ethers.js` connects to the contract and MongoDB.
- **MongoDB Atlas** stores wallet address, balance, and event history.

---

## 🛠 Tech Stack

- **Solidity**
- **Node.js**
- **Ethers.js**
- **MongoDB (Mongoose)**
- **Railway (Deployment)**


---

## 🧪 How to Test

### 1. Deploy & Fund Contract
- Use [Remix](https://remix.ethereum.org) to deploy `WalletContract.sol` on **Sepolia**.
- Fund it using Sepolia ETH from [faucets](https://sepoliafaucet.com).

### 2. Interact via MetaMask
- Call `deposit()` by sending ETH to the contract.
- Call `withdraw(uint amount)` with a valid amount (in wei).

### 3. Monitor MongoDB
- Each event will:
  - Log type (`deposit` or `withdrawal`)
  - Amount in ETH
  - TxHash
  - Timestamp
- Wallet's latest balance is updated in MongoDB.

---

## 🛡️ Environment Variables

Copy `.env.example` to `.env` and fill with your data:

```env
INFURA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0xYourContractAddress
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db


