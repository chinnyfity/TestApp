import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from './context/AppContext';
import ScreenHouse from './screens/ScreenHouse';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePics, setProfilePics] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getUserStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfos');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  const fetchStorage = async () => {
    try {
      const data = await getUserStorage();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  useEffect(() => {
    fetchStorage();
  }, []);

 



  return (
    <AppContext.Provider value=
    {{ 
      isLoading, setIsLoading,
      profilePics, setProfilePics,
      isLoggedIn, setIsLoggedIn,
      userInfo, setUserInfo,
      userDetails, setUserDetails,
      isPasswordVisible, setIsPasswordVisible,
      showLogin, setShowLogin,
      showLoginModal, setShowLoginModal,
      isPinVisible, setIsPinVisible,
      refreshing, setRefreshing,

    }}
    >
      <ScreenHouse />
    </AppContext.Provider>
  );
}
