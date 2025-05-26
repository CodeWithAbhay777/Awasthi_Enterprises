import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { toast } from "sonner";
import postLedgerEntries from "@/utils/api/postLedgerEntries";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

import getStructuredDate from "@/utils/getStructuredDate";
import fetchEntries from "@/utils/api/fetchEntries";

const AddEntryModal = ({
  setAddEntryModal,
  setAllEntries,
  aid,
  page,
  setTotal,
}) => {
  const [particulars, setParticulars] = useState("");
  const [debitAmount, setDebitAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const[saveLoading , setSaveLoading] = useState(false);

  const handleSubmitEntry = async () => {
    try {

      setSaveLoading(true);

      
      if (!particulars){
        setSaveLoading(false);
        return toast.error("particulars can't be empty");
      } 

      if ((!creditAmount || creditAmount === 0)  && (!debitAmount || debitAmount === 0)){
         setSaveLoading(false);
         return toast.error("Credit or debit both can't be empty");
      }
        

      if (creditAmount  && debitAmount) {
        setSaveLoading(false);
        return toast.error("Choose any one : Credit or Debit");
      }
        

      const dataToSend = {};

      if (particulars) dataToSend.particulars = particulars;
      if (debitAmount !== 0) dataToSend.debitAmount = debitAmount;
      if (creditAmount !== 0) dataToSend.creditAmount = creditAmount;
      if (aid) dataToSend.ledgerOwnerId = aid;
      const newDate = getStructuredDate(date);
      if (newDate) dataToSend.date = newDate;
      console.log('ready to make api call')
      const response = await postLedgerEntries(dataToSend);

      if (!response.success){
        setSaveLoading(false);
        return toast.error(response.res || "Something went wrong");
      }
        

      toast.success("Entry added successfully!");

      
      
      const reFetch = await fetchEntries(aid, page);
     
      setSaveLoading(false);
      if (!reFetch.success)
        return toast.error(reFetch.res || "Something went wrong!");
      
      setAllEntries(reFetch.res);
      setTotal(reFetch.total);
      setAddEntryModal(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10]">
      <Card className="w-[350px] mx-2">
        <CardHeader>
          <CardTitle>Create account entry</CardTitle>
          <CardDescription>
            Here you can create entry for account by putting particulars,
            credits or debits etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Particulars</Label>
              <Input
                id="name"
                placeholder="Particulars"
                value={particulars}
                onChange={(e) => setParticulars(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Date (date of entry)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Credit amount</Label>
              <Input
                id="name"
                placeholder="Credit"
                type="Number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Debit amount</Label>
              <Input
                id="name"
                placeholder="Debit"
                type="Number"
                value={debitAmount}
                onChange={(e) => setDebitAmount(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setAddEntryModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitEntry} disabled={saveLoading} >{!saveLoading ? 'Save entry' : <LoaderCircle className={`${saveLoading ? 'text-xl m-auto animate-spin' : ''}`}/>}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddEntryModal;
