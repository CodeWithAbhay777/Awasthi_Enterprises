
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import deleteEntry from '@/utils/api/deleteEntry';
import fetchEntries from '@/utils/api/fetchEntries';
import { LoaderCircle } from 'lucide-react';

const ConfirmDeleteEntry = ({id , name , setConfirmDeleteModal , setAllEntries , aid , page , setTotal}) => {
  const [loading , setLoading] = useState(false);

     const handleDeleteEntry = async() => {

        try {
          setLoading(true);
            const response = await deleteEntry(id);
            
            if (!response.success){
              setLoading(false);
              return toast.error(response.res || 'Something went wrong');
            } 

            const reFetch = await fetchEntries(aid , page);
            
            if (!reFetch.success){
              setLoading(false);
              return toast.error(reFetch.res || 'Something went wrong');
            } 
            
            setAllEntries(reFetch.res);
            setTotal(reFetch.total);
            setLoading(false);
            toast.success('Entry deleted successfully!')
            setConfirmDeleteModal({state : false , id : null , name : null});
            
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10]'>
        <Card className="w-[350px] mx-2">
      <CardHeader>
        <CardTitle>Delete organization entry</CardTitle>
        
      </CardHeader>
      <CardContent>
        
         <h1>Are you sure you want to delete {name} entry?</h1>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setConfirmDeleteModal({state : false , id : null , name : null})}>Cancel</Button>
        <Button onClick={handleDeleteEntry} className="bg-red-500" disabled={loading}>{!loading ? 'Confirm delete' : <LoaderCircle className={`${loading ? 'text-xl m-auto animate-spin' : ''}`}/>}</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default ConfirmDeleteEntry