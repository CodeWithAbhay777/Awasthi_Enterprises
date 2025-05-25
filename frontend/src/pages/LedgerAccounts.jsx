import AddAccountModal from '@/components/AddAccountModal'
import ConfirmDeleteAccount from '@/components/ConfirmDeleteAccount'
import EditLedgerAccount from '@/components/EditLedgerAccount'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

import fetchLedgerAccounts from '@/utils/api/fetchLedgerAccounts'
import { useDebounceEffect } from '@/utils/debounce'
import { IndianRupee, Pencil, Trash, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LedgerAccounts = () => {

    const [search , setSearch] = useState("");
    const [confirmDeleteModal , setConfirmDeleteModal] = useState({state : false , id : null , name : null});
    const [editModal , setEditModal] = useState({state : false , id : null , data : {}});
    const [addAccountModal , setAddAccountModal] = useState(false);
    const [ledgerAccounts , setLedgerAccounts] = useState([]);
    const [loading , setLoading] = useState(true);
    const naviagte = useNavigate();

    const callbackDebounce = async() => {
        try {

            setLoading(true);
            const response = await fetchLedgerAccounts(search);
            if(!response.success) return toast.error(response.res || 'Something went wrong!');

            setLedgerAccounts(response.res);

            setLoading(false);

        } catch (error) {
           console.log(error); 
           toast.error('Something went wrong');
        }
    }

   

    useDebounceEffect(callbackDebounce , [search] , 800);



    

  return (
    <div className='className="w-full min-h-screen bg-gradient-to-br from-[#414141] to-black mt-16 flex flex-col'>

        {
            addAccountModal && <AddAccountModal setAddAccountModal={setAddAccountModal} setLedgerAccounts={setLedgerAccounts} />
        }

        {
            confirmDeleteModal.state && <ConfirmDeleteAccount name={confirmDeleteModal.name} id={confirmDeleteModal.id} setConfirmDeleteModal={setConfirmDeleteModal} ledgerAccounts={ledgerAccounts} setLedgerAccounts={setLedgerAccounts}/>
        }

        {
            editModal.state && <EditLedgerAccount editModal={editModal} setEditModal={setEditModal} ledgerAccounts={ledgerAccounts} setLedgerAccounts={setLedgerAccounts}/>
        }
        <div className='fixed w-full h-18 p-2 flex items-center justify-center mb-1 bg-gradient-to-br from-black to-[#414141] border-b'>
            
            <Input value={search} onChange={e => setSearch(e.target.value)} type='text' placeholder="Search by organization name" className='text-white'/>
        </div>
        <div className='flex-1 w-full p-2 overflow-auto mt-18'>
            {
                !loading ? (ledgerAccounts.map((acc , i) => (
                    <div key={i} onClick={() => naviagte(`/ledger/${acc._id}` , {state : {orgName : acc.organizationName , orgContact : acc.contact}})} className='w-full h-25 my-1 border-1 cursor-pointer flex items-center justify-between border-white rounded bg-gradient-to-br from-black to-[#212121] shadow-2xl'>
                        <div className=' w-[85%] h-full p-2'>
                            <h1 className='font-medium text-xl truncate text-white my-1'>{acc.organizationName}</h1>
                            <h4 className='text-gray-500 text-[0.8rem] truncate'>{acc.organizationAddress}</h4>
                            
                                <h1 className='font-medium text-white mt-1'>BALANCE : <span className='font-bold text-green-500'>₹ {acc.balanceAmount}</span> </h1>
                            
                        </div>
                        <div className='h-full w-[15%] flex flex-col items-center justify-evenly'>
                            <Trash onClick={(e) => {e.stopPropagation(); setConfirmDeleteModal({state : true , id : acc._id , name : acc.organizationName})}} className='text-red-500'/>
                            <Pencil 
                            onClick={(e) => {e.stopPropagation();   setEditModal({state : true , id : acc._id , data : {organizationName : acc.organizationName, organizationAddress : acc.organizationAddress , contact : acc.contact , balanceAmount : acc.balanceAmount }});}} 
                            className='text-blue-500'/>
                        </div>
                    </div>
                ))) : (<div className=' flex flex-col h-full w-full'>
                    <Skeleton className="h-25 w-full my-1 bg-gray-600 " />
                    <Skeleton className="h-25 w-full my-1 bg-gray-600 " />
                    <Skeleton className="h-25 w-full my-1 bg-gray-600 " />
                    <Skeleton className="h-25 w-full my-1 bg-gray-600 " />
                    <Skeleton className="h-25 w-full my-1 bg-gray-600 " />
                    
                </div>)
            }
        </div>
        <div onClick={() => setAddAccountModal(true)} className='fixed bg-black h-15 w-15 rounded-full right-3 bottom-5 border-2 border-white flex items-center justify-center'>
            <UserPlus className='text-white'/>
        </div>
    </div>
  )
}

export default LedgerAccounts