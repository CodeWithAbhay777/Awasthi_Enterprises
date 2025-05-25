import userModel from "../models/user.module.js";
import ledgerEntriesModel from "../models/ledgerEntries.module.js";
import ledgerAccountModel from "../models/ledgerAccount.module.js";

import moment from "moment";

export const getAllEntries = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const data = await ledgerEntriesModel
      .find({ ledgerOwnerId: id })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });
    const total = await ledgerEntriesModel.countDocuments({
      ledgerOwnerId: id,
    });

    if (!data) {
      res.status(404).json({
        msg: "fetching data : no data found",
        success: false,
      });
    }

    res.status(200).json({
      data,
      total,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const postEntry = async (req, res) => {
  try {
    let { particulars, date, debitAmount, creditAmount, ledgerOwnerId } =
      req.body;

    if (!particulars) {
      res.status(403).json({
        msg: "fill all details",
        success: false,
      });
    }

    let account = await ledgerAccountModel
      .findById(ledgerOwnerId)
      .select("balanceAmount");

    let blc = Number(account?.balanceAmount);

    let dataToStore = {};
    let currentBalance;
    if (debitAmount) {
      debitAmount = Number(debitAmount);
      currentBalance = blc + debitAmount;
      dataToStore.currentBalance = currentBalance;
      dataToStore.debitAmount = debitAmount;
    }

    if (creditAmount) {
      creditAmount = Number(creditAmount);
      currentBalance = blc - creditAmount;
      dataToStore.currentBalance = currentBalance;
      dataToStore.creditAmount = creditAmount;
    }
    const createdAt = moment().format("D MMM YYYY");
    dataToStore.particulars = particulars;
    dataToStore.date = date;
    dataToStore.ledgerOwnerId = ledgerOwnerId;
    dataToStore.createdAt = createdAt;

    const data = await ledgerEntriesModel.create(dataToStore);

    if (!data) {
      return res.status(500).json({
        msg: "Something went wrong while saving data",
        success: false,
      });
    }

    const saveBalance = await ledgerAccountModel.findByIdAndUpdate(
      ledgerOwnerId,
      {
        balanceAmount: currentBalance,
      }
    );

    if (!saveBalance) {
      return res.status(500).json({
        msg: "Something went wrong while saving balance",
        success: false,
      });
    }

    res.status(201).json({
      msg: "Entry saved successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export const editEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { particulars, date, debitAmount, creditAmount } = req.body;

    const entryToEdit = await ledgerEntriesModel.findById(id);
    if (!entryToEdit) {
      return res.status(404).json({ msg: "Entry not found", success: false });
    }

    entryToEdit.particulars = particulars || entryToEdit.particulars;
    entryToEdit.date = date || entryToEdit.date;
    entryToEdit.debitAmount = Number(debitAmount) || 0;
    entryToEdit.creditAmount = Number(creditAmount) || 0;

    await entryToEdit.save();

    const allEntries = await ledgerEntriesModel
      .find({
        ledgerOwnerId: entryToEdit.ledgerOwnerId,
      })
      .sort({ _id: 1 });

    let runningBalance = 0;

    for (const entry of allEntries) {
      runningBalance += entry.debitAmount || 0;
      runningBalance += entry.creditAmount || 0;
      entry.currentBalance = runningBalance;
      await entry.save();
    }

    await ledgerAccountModel.findByIdAndUpdate(entryToEdit.ledgerOwnerId, {
      balanceAmount: runningBalance,
    });

    return res.status(200).json({ msg: "Entry edited", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEnt = await ledgerEntriesModel.findByIdAndDelete(id);

    if (!deleteEnt) {
      res.status(404).json({
        msg: "No entry found",
        success: false,
      });
    }

    const allEntries = await ledgerEntriesModel
      .find({
        ledgerOwnerId: deleteEnt.ledgerOwnerId,
      })
      .sort({ _id: 1 });

    let runningBalance = 0;

    for (const entry of allEntries) {
      runningBalance += entry.debitAmount || 0;
      runningBalance += entry.creditAmount || 0;
      entry.currentBalance = runningBalance;
      await entry.save();
    }

    await ledgerAccountModel.findByIdAndUpdate(deleteEnt.ledgerOwnerId, {
      balanceAmount: runningBalance,
    });

    return res
      .status(200)
      .json({ msg: "Entry deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};
