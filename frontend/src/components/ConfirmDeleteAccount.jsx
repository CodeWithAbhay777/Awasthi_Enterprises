import deleteAccount from '@/utils/api/deleteAccount';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { LoaderCircle } from 'lucide-react';

const ConfirmDeleteAccount = ({id , name , setConfirmDeleteModal, ledgerAccounts , setLedgerAccounts}) => {

    const [loading , setLoading] = useState(false);

     const handleDeleteAccount = async() => {

        try {
          setLoading(true);
            const response = await deleteAccount(id);
            if(!response.success){
              setLoading(false);
              return toast.error(response.res || 'Something went wrong!');
            } 

            const newLedgerAccounts = ledgerAccounts.filter((acc) => acc._id !== id);
            
            setLedgerAccounts(newLedgerAccounts);
            setLoading(false);
            setConfirmDeleteModal({state : false , id : null , name : null});

            toast.success(response.res || 'Account deleted successfully');

            
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10]'>
        <Card className="w-[350px] mx-2">
      <CardHeader>
        <CardTitle>Delete organization account</CardTitle>
        
      </CardHeader>
      <CardContent>
        
         <h1>Are you sure you want to delete {name} account?</h1>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setConfirmDeleteModal({state : false , name : null , id : null})}>Cancel</Button>
        <Button onClick={handleDeleteAccount} className="bg-red-500" disabled={loading}>{!loading ? 'Confirm delete' : <LoaderCircle className={`${loading ? 'text-xl m-auto animate-spin' : ''}`}/>}</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default ConfirmDeleteAccount