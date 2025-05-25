import React from "react";
import Logo from "./logo";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import logoutUser from "@/utils/api/logoutUser";
import {changeAuthState} from '../features/auth/authSlice.js';

import { toast } from "sonner";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = async() => {
    const response = await logoutUser();
    if(!response.success) return toast.error('Something went wrong');

    toast.success(response.res || 'Logged out successfully');

    const newAuth = {
      authentication : false ,
      authUserData : null
    }

    dispatch(changeAuthState(newAuth));
    navigate('/login');
  }

  return (
    <div className="fixed top-0 left-0 h-16 w-full flex items-center justify-between px-2 bg-black shadow-md">
      <div onClick={() => navigate('/')} className="h-13 w-13 rounded-full overflow-hidden border-2 border-white flex items-center justify-center">
        <Logo />
      </div>

      {auth.authentication ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu className="text-white mr-2"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => toast.info('Under development!')}>
                Profile
                
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => navigate('/ledger')}>
                Ledger
                
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Under development!')}>
                Daybook
                
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            
            
            <DropdownMenuItem onClick={handleLogoutClick}>
              Log out
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate('/login')}>login</Button>
      )}
    </div>
  );
};

export default Navbar;
