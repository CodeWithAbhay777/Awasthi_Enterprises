import editAccount from "@/utils/api/EditAccount";
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const EditLedgerAccount = ({
  editModal,
  setEditModal,
  ledgerAccounts,
  setLedgerAccounts,
}) => {
  const [newOrgName, setNewOrgName] = useState(editModal.data.organizationName);
  const [newOrgAddress, setNewOrgAddress] = useState(
    editModal.data.organizationAddress
  );
  const [newBalanceAmt, setNewBalanceAmt] = useState(
    editModal.data.balanceAmount
  );
  const [newContact, setNewContact] = useState(editModal.data.contact);
  const [loading , setLoading] = useState(false);

  const handleEditAccount = async () => {
    if (!newOrgName) return toast.error("Organization name can't be empty");
    setLoading(true);
    const dataToSend = {};

    if (newOrgName) dataToSend.organizationName = newOrgName;
    if (newOrgAddress) dataToSend.organizationAddress = newOrgAddress;
    if (newBalanceAmt) dataToSend.balanceAmount = newBalanceAmt || 0;
    if (newContact) dataToSend.contact = newContact;

    const response = await editAccount(dataToSend, editModal.id);

    if (!response.success){
      setLoading(false);
      return toast.error(response.res || "Something went wrong!");
    }
      

    const newLedgerAccounts = ledgerAccounts.map((acc) =>
      acc._id === editModal.id
        ? { ...acc, ...dataToSend }
        : acc
    );

    setLedgerAccounts(newLedgerAccounts);
    setLoading(false);
    setEditModal({ state: false, id: null, data: null });

    toast.success(response.res || "Account edited successfully");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10]">
      <Card className="w-[350px] mx-2">
        <CardHeader>
          <CardTitle>Edit organization account</CardTitle>
          <CardDescription>
            Here you can edit accounts for orgs by putting name, address and
            balance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization name</Label>
              <Input
                id="name"
                placeholder="Name"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization address</Label>
              <Input
                id="name"
                placeholder="optional"
                value={newOrgAddress}
                onChange={(e) => setNewOrgAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Contact No.</Label>
              <Input
                id="name"
                placeholder="optional"
                type="phone"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Balance in ₹ (Ruprees)</Label>
              <Input
                id="name"
                placeholder="Balance"
                type="phone"
                value={newBalanceAmt}
                onChange={(e) => setNewBalanceAmt(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setEditModal({ state: false, id: null, data: null })}
          >
            Cancel
          </Button>
          <Button onClick={handleEditAccount} disabled={loading}>{!loading ? 'Edit account' : <LoaderCircle className={`${loading ? 'text-xl m-auto animate-spin' : ''}`}/>}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditLedgerAccount;
