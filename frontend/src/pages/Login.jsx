import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import loginUser from "@/utils/api/loginUser";
import registerUser from "@/utils/api/registerUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useDispatch} from "react-redux";
import {changeAuthState} from '../features/auth/authSlice.js';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerFullname, setRegisterFullname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginRole, setLoginRole] = useState("");

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const handleRegisterUser = async () => {
    try {
      if (
        !registerUsername ||
        !registerPassword ||
        !registerFullname ||
        !registerEmail
      )
        return toast.error("Fill all fields");

      const dataToSend = {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        fullname: registerFullname,
      };
      const response = await registerUser(dataToSend);

      if (!response.success)
        return toast.error(response.res || "Something went wrong");

      toast.success("User registered successfully");

      const newAuth = {
        authentication : true ,
        authUserData : response.res,
      }

      dispatch(changeAuthState(newAuth));

      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.msg);
      toast.error("Something went wrong");
    }
  };

  const handleLoginUser = async () => {
    try {
      if (!loginRole || !loginPassword || !loginUsername) {
        toast.error("Fill all fields");
        return;
      }

      const loginBody = {
        username: loginUsername,
        password: loginPassword,
        role: loginRole || "user",
      };

      const response = await loginUser(loginBody);

      if (!response.success)
        return toast.error(response.res || "Something went wrong");

      toast.success("User registered successfully");

      const newAuth = {
        authentication : true ,
        authUserData : response.res,
      }

      dispatch(changeAuthState(newAuth));

      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.msg || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#414141] to-black flex items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px] m-2 sm:m-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter username and password to login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new">Select role</Label>
                <Select
                  value={loginRole}
                  onValueChange={(e) => setLoginRole(e)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Admin</SelectLabel>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  id="name"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  id="username"
                  placeholder="Enter password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLoginUser}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Enter username , fullname , email , password with specified role
                to register
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Username</Label>
                <Input
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  id="current"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Full name</Label>
                <Input
                  value={registerFullname}
                  onChange={(e) => setRegisterFullname(e.target.value)}
                  id="new"
                  type="text"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Email</Label>
                <Input
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  id="new"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  id="new"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegisterUser}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
