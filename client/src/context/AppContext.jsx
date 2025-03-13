
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) =>{

  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URl;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async()=>{ // for checking authentication
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/isauth')
      if(data.success){
        setIsLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getUserData = async () =>{ // GEt the user data
    try {
      const{data} = await axios.get(backendUrl + '/api/user/data')
      data.success ? setUserData(data.userData): toast.error(data.message)
    } catch (error) {
      toast.error(data.message)
    }
  }
 
  useEffect(()=>{ // whwn we reload the page it will check for getAuthState (Authentication)
    getAuthState()
  },[])

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };
  return (
    <AppContent.Provider value={value}>
        {props.children}
    </AppContent.Provider>
  );
};
