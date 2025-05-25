import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React,{useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import meUser from "@/utils/api/meUser";
import {changeAuthState} from '../features/auth/authSlice.js';
import { toast } from "sonner";


const EntryPage = () => {

  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const apiCall = async () => {
      const response = await meUser();
      
      if (!response.success) {
        toast.error(response.res);
        const newUser = {authentication : false , authUserData : null};
        dispatch(changeAuthState(newUser));
        return;
      }

      const newUser = {authentication : true , authUserData : response.res}

      dispatch(changeAuthState(newUser));
    }
    
    apiCall();

  },[]);

  const handleLedgerClick = () => {
    if (!auth.authentication) return navigate('/login');
    navigate('/ledger');
   
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#414141] to-black overflow-x-hidden">
      <Card className="w-[350px] h-60 m-2 sm:m-4">
        <CardHeader>
          <CardTitle>Select file</CardTitle>
          <CardDescription>Click daybook for daily records .</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => toast.info('Under development')} variant="outline" className="w-full my-2">
            View day book
          </Button>
          <Button className="w-full" onClick={handleLedgerClick}>
            View ledger
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryPage;
