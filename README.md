# Web3 Wallet Listener – Blockchain Event Sync Challenge

A MetaMask-compatible wallet listener service that listens to on-chain deposit and withdrawal events on the Ethereum Sepolia testnet and updates a MongoDB database ledger in real-time.

---

## 🔗 Live Deployment

- **Smart Contract (Sepolia)
- **MongoDB:** Hosted on MongoDB Atlas
- **Event Listener Backend:** Node.js + Ethers.js

---

## 🧩 Features

### ✅ Smart Contract
- Written in Solidity (`0.8.20`)
- Supports:
  - `deposit()` payable function
  - `withdraw(uint amount)` function
- Emits:
  - `Deposit(address from, uint amount)`
  - `Withdrawal(address to, uint amount)`

### ✅ Backend Listener
- Built with `Node.js` and `ethers.js`
- Connects to Ethereum testnet via Infura RPC
- Listens to:
  - `Deposit` event
  - `Withdrawal` event
- On each event:
  - Logs transaction details
  - Updates MongoDB document with:
    - Latest balance
    - Event history (amount, type, txHash, timestamp)

### ✅ MongoDB Ledger
Schema:
```json
{
  "wallet_address": "0x...",
  "latest_balance": 1.25,
  "events": [
    {
      "type": "deposit",
      "amount": 0.5,
      "txHash": "0xabc...",
      "timestamp": "2025-04-08T12:00:00Z"
    }
  ]
}
