const formatLedgerForWhatsapp = (entries, orgName) => {
  let message = `📒 Ledger Summary for *${orgName}*\n\n`;

  entries.forEach((entry, index) => {
    message += `🔹 Entry ${index + 1}\n`;
    message += `📅 Date: ${entry.date}\n`;
    message += `📝 Particulars: ${entry.particulars}\n`;
    if (entry.debitAmount !== 0) message += `🔻 Debit: ₹${entry.debitAmount}\n`;
    if (entry.creditAmount !== 0) message += `🔺 Credit: ₹${entry.creditAmount}\n`;
    message += `💰 Balance: ₹${entry.currentBalance}\n\n`;
  });

  return encodeURIComponent(message);
};

export default formatLedgerForWhatsapp;
