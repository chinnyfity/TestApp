import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/solid";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import { styles } from "../../themes";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import { AppContext } from "../../context/AppContext";
import { API_ROUTES } from "../utils/constants";
import { headers } from "../utils/headers";


export default function LoginScreen() {
  const {
    isPasswordVisible,
    setIsPasswordVisible,
    showLogin,
    setShowLogin,
    isPinVisible,
    setIsPinVisible,
    setShowLoginModal,
    isLoading, setIsLoading,
    userInfo, setUserInfo,
  } = useContext(AppContext);

  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const maxHeightBottom = (2.4 * screenHeight) / 4;
  const maxHeightBottom1 = (2.4 * screenHeight) / 5.5;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });



  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePinVisibility = () => {
    setIsPinVisible(!isPinVisible);
  };


  const toggleView = () => {
    setShowLogin(!showLogin);
  };


  const handleButtonLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ROUTES.LOGIN_USER, {
          method: "POST",
          headers: { ...headers },
          body: JSON.stringify(data),
      });
      const datas = await response.json();
      console.log(datas);
      setIsLoading(false);      
      
      if(datas){
        if(datas.error){
          Alert.alert("Error!", datas.error);
        }else{
          const customData = {
            ...data, // store input data
            datas // store response data
          }
          AsyncStorage.setItem('userInfos', JSON.stringify(customData)).then(
            () => AsyncStorage.getItem('userInfos').then((result) => {
              setIsLoading(false);
              if(result !== null){
                setUserInfo(JSON.parse(result));
                reset();
                navigation.navigate('MainDashboard');
                return;
              }
            }
          ));
        }
      }
    } catch (error) {
      Alert.alert("Error!", error.toString());
      setIsLoading(false);
    }
  }

  const handleButtonReset = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    setShowLoginModal(true);
  }, []);

  return (
    <KeyboardAwareScrollView
      style={[styles.scrollView, {backgroundColor:'#ddd' }]}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >

      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.roundCardTop, {backgroundColor:'#ddd'} ]}>
          <Image
            source={require("../../assets/images/logo1.png")}
            style={{ width: 310, marginLeft: -40 }}
            resizeMode="contain"
          />
          <Text
            className="text-gray-800"
            style={{ top: -170, fontFamily: "Nunito-Bold", fontSize: 20 }}
          >
            Welcome Back!
          </Text>
        </View>


        <View style={[styles.roundCardBottom, {minHeight: !showLogin ? maxHeightBottom1 : maxHeightBottom,}]}>
          <Text style={styles.thinLine}></Text>
          {showLogin && (
            <View style={{ flex: 1 }}>
              

              <View className="space-y-10 pt-2 px-0" style={{ flex: 1 }}>
                <View className="pt-0" style={{ flex: 1 }}>
                  <Text style={styles.lgLabel}>Login / Create Account</Text>
                </View>
                <View className="mb-16" style={{ flex: 1 }}>
                  <View className="pt-1">
                    <CustomTextInput
                      control={control}
                      customStyles={{
                        fontSize: 19,
                        borderRadius: 60,
                        paddingLeft: 20,
                        textTransform: 'lowercase'
                      }}
                      name="email"
                      keyboardType="email-address"
                      placeholder="Enter your email"
                      rules={{
                        required: "Email address is required",
                      }}
                    />
                  </View>

                  <View className="-mt-3">
                    <View className="">
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          zIndex: 9,
                          right: 15,
                          top: 15,
                        }}
                        onPressIn={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeSlashIcon size={26} color="#333" />
                        ) : (
                          <EyeIcon size={26} color="#333" />
                        )}
                      </TouchableOpacity>
                    </View>

                    <CustomTextInput
                      control={control}
                      customStyles={{
                        fontSize: 19,
                        borderRadius: 60,
                        paddingLeft: 20,
                      }}
                      name="password"
                      secureTextEntry={!isPasswordVisible}
                      placeholder="Enter password"
                      rules={{
                        required: "Password is required",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    className="-mt-2 mb-5 pl-3 pr-3"
                  >
                    
                    <View>
                      <Text
                        style={[styles.smallLabel, { fontWeight: 600 }]}
                      >{` `}</Text>
                    </View>

                    <TouchableOpacity onPressIn={toggleView}>
                      <Text style={[styles.smallLabel, { textAlign: "right" }]}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-4">
                    <TouchableOpacity 
                      activeOpacity={0.6}
                      onPress={() => {
                        navigation.navigate('RegisterScreen', '');
                      }}
                    >
                        <Text style={[styles.smallLabel, { textAlign: "center" }]}>
                          Don't have account? Create one
                        </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                

                <View style={styles.buttonContainer1}>
                  <CustomButton
                    text="PROCEED"
                    onPressIn={handleSubmit(handleButtonLogin)}
                    customState={isLoading}
                  />
                </View>
              </View>
            </View>
          )}

          {!showLogin && (
            <View className="space-y-0">
              <View className="pt-1">
                <Text style={styles.lgLabel}>Reset Password</Text>
                <Text className="text-center text-[14px] mt-2">Enter your email associated with this app</Text>
              </View>

              <View className="py-5 pt-5 px-0">
                <View className="mb-20">
                  <View className="pt-1">
                    <View className="">
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          zIndex: 9,
                          right: 15,
                          top: 19,
                        }}
                        onPressIn={togglePinVisibility}
                      >
                        {isPinVisible ? (
                          <EyeSlashIcon size={26} color="#333" />
                        ) : (
                          <EyeIcon size={26} color="#333" />
                        )}
                      </TouchableOpacity>
                    </View>

                    <CustomTextInput
                      control={control}
                      customStyles={{ fontSize: 19, borderRadius: 50, textTransform: 'lowercase' }}
                      name="email"
                      keyboardType="email-address"
                      placeholder="Enter your email address"
                      rules={{
                        required: "Email is required",
                      }}
                    />
                  </View>

                  <View className="-mt-3 pr-4">
                    <TouchableOpacity onPressIn={toggleView}>
                      <Text className="text-right" style={[styles.smallLabel]}>
                        {" "}
                        Go Back
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.buttonContainer1]}>
                  <CustomButton
                    customStyle={{ backgroundColor: "#7b47cc" }}
                    text="RESET PASSWORD"
                    onPressIn={handleSubmit(handleButtonReset)}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
