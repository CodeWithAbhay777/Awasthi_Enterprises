import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'

import { Button } from './ui/button'
import { toast } from 'sonner'
import postLedgerAccount from '@/utils/api/postLedgerAccount'
import fetchLedgerAccounts from '@/utils/api/fetchLedgerAccounts'
import { LoaderCircle } from 'lucide-react'

const AddAccountModal = ({setAddAccountModal , setLedgerAccounts}) => {

    const [organizationName , setOrganizationName] = useState('');
    const [organizationAddress , setOrganizationAddress] = useState('');
    const [balance , setBalance] = useState(0);
    const [contact , setContact] = useState();
    const [saveLoading , setSaveLoading] = useState(false);

    const handleSubmitAccount = async() => {

        try {
            setSaveLoading(true);
            if (!organizationName){
              setSaveLoading(false);
              return toast.error("Organization name can't be empty");
            } 

            const dataToSend = {};

            if (organizationName) dataToSend.organizationName = organizationName;
            if (organizationAddress) dataToSend.organizationAddress = organizationAddress;
            if (balance) dataToSend.balanceAmount = balance || 0;
            if (contact) dataToSend.contact = contact;
            

            const response = await postLedgerAccount(dataToSend);

            if (!response.success){
              setSaveLoading(false);
              return toast.error(response.res || 'Something went wrong');
            }

            toast.success('Account added successfully!');

            const reFetch = await fetchLedgerAccounts();

            setSaveLoading(false);

            if (!reFetch.success) return toast.error(reFetch.res || 'Something went wrong!');

            setLedgerAccounts(reFetch.res);

            setAddAccountModal(false);


            
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }

    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10]'>
        <Card className="w-[350px] mx-2">
      <CardHeader>
        <CardTitle>Create organization account</CardTitle>
        <CardDescription>Here you can create accounts for orgs by putting name , address and balance.</CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization name</Label>
              <Input id="name" placeholder="Name" value={organizationName} onChange={e => setOrganizationName(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organization address</Label>
              <Input id="name" placeholder="optional" value={organizationAddress} onChange={e => setOrganizationAddress(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Contact No.</Label>
              <Input id="name" placeholder="optional" type="Number" value={contact} onChange={e => setContact(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Balance in ₹ (Ruprees)</Label>
              <Input id="name" placeholder="Balance" type="Number" value={balance} onChange={e => setBalance(e.target.value)}/>
            </div>
            
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setAddAccountModal(false)}>Cancel</Button>
        <Button onClick={handleSubmitAccount} disabled={saveLoading}>{!saveLoading ? 'Save account' : <LoaderCircle className={`${saveLoading ? 'text-xl m-auto animate-spin' : ''}`}/>}</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default AddAccountModal