import mongoose from "mongoose";

const ledgerAccountSchema = mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  organizationName : {
    type : String,
    required : true,
  },
  organizationAddress : {
    type : String,
  },
  balanceAmount : {
    type : Number,
    default : 0,
  },
  contact:{
    type : Number,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});

const ledgerAccountModel = mongoose.model("ledgerAccountModel", ledgerAccountSchema);

export default ledgerAccountModel;