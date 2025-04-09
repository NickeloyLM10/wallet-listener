const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  txHash: String,
  timestamp: Date
});

const WalletSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true, unique: true },
  latest_balance: { type: Number, default: 0 },
  events: [EventSchema]
});

const Wallet = mongoose.model('Wallet', WalletSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = { connectDB, Wallet };
