import userModel from "../models/user.module.js";
import ledgerAccountModel from "../models/ledgerAccount.module.js";
import moment from "moment";

export const getLedgerAccounts = async (req, res) => {
  try {
    const user_id = req.user_id;
    const filterSearch = req.query?.search || "";
    
    const ledgerAccounts = await ledgerAccountModel
      .find({ ownerId: user_id, organizationName: { $regex: filterSearch } })
      .sort({ _id: -1 });
    if (!ledgerAccounts) {
      return res.status(404).json({
        msg: "finding Accounts : No data found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: ledgerAccounts,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const getLedgerAccountData = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { id } = req.query;

    const accountData = await ledgerAccountModel.findById(id);

    if (!accountData) {
      return res.status(404).json({
        msg: "finding Account : No data found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: accountData,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const postLedgerAccount = async (req, res) => {
  try {
    const user_id = req.user_id;
    let {
      organizationName,
      organizationAddress = "",
      balanceAmount = 0,
      contact
    } = req.body;

    balanceAmount = Number(balanceAmount);
    if (contact) contact = Number(contact);
      

    if (!organizationName) {
      return res.status(401).json({
        msg: "organization name required!",
        success: false,
      });
    }
    const currentTime = moment().format("D MMM YYYY");

    const dataToSend = {
      organizationName,
      organizationAddress,
      ownerId: user_id,
      createdAt: currentTime,
      balanceAmount,
      contact
    };

    const data = await ledgerAccountModel.create(dataToSend);

    if (!data) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong while saving data",
      });
    }

    return res.status(201).json({
      msg: "Oraganization account created successfully",
      data,
      success: true,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const putLedgerAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationName, organizationAddress, balanceAmount , contact } = req.body;

    const dataToEdit = {};

    if (organizationName !== undefined)
      dataToEdit.organizationName = organizationName;
    if (organizationAddress !== undefined)
      dataToEdit.organizationAddress = organizationAddress;
    if (balanceAmount !== undefined) 
      dataToEdit.balanceAmount = balanceAmount;
    if (contact !== undefined) 
      dataToEdit.contact = contact;

    const data = await ledgerAccountModel.findByIdAndUpdate(id, dataToEdit);

    if (!data) {
      return res.status(500).json({
        msg: "Editing Account : Something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Account edited successfully",
      success: true,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const deleteLedgerAccount = async (req, res) => {
  try {
    const { id } = req.params;
    

    const deleteData = await ledgerAccountModel.findByIdAndDelete(id);

    if (!deleteData) {
      return res.status(500).json({
        msg: "deleting Account : Something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};
