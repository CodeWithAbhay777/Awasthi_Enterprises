import mongoose from "mongoose";

const ledgerEntriesSchema = mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  particulars: {
    type: String,
    required: true,
  },

  debitAmount: {
    type: Number,
    default: 0,
  },
  creditAmount: {
    type: Number,
    default: 0,
  },
  currentBalance : {
    type : Number ,
  },
  ledgerOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ledgerAccountModel",
    required: true,
  },
});

const ledgerEntriesModel = mongoose.model(
  "ledgerEntriesModel",
  ledgerEntriesSchema
);

export default ledgerEntriesModel;
