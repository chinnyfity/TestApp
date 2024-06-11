import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import React, { useContext, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/solid";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../themes";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import { AppContext } from "../../context/AppContext";
import { API_ROUTES } from "../utils/constants";
import { headers } from "../utils/headers";

export default function RegisterScreen() {
  const {
    isPasswordVisible,
    setIsPasswordVisible,
    isLoading, setIsLoading,
    userInfo, setUserInfo,
  } = useContext(AppContext);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleButtonCreate = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ROUTES.CREATE_USER, {
          method: "POST",
          headers: { ...headers },
          body: JSON.stringify(data),
      });
      const datas = await response.json();
      console.log(datas.error);
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


  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const [passwordStrength, setPasswordStrength] = useState({
    uppercase: false,
    characters: false,
    specialSymbol: false
  });

  const handleChanges = (text) => {
    const hasUppercase = /[A-Z]/.test(text);
    const hasCharacters = text.length >= 6;
    const hasSpecialSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(text);
    setPasswordStrength({
      uppercase: hasUppercase,
      characters: hasCharacters,
      specialSymbol: hasSpecialSymbol
    });
  };


  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={[styles.safeArea, {backgroundColor:'#fff'}]}>
        <View>
          <View
            className="p-3"
            style={[styles.topContainer1, { justifyContent: "flex-start" }]}
          >
            <Text
              style={{
                color: "#333",
                fontFamily: "Quicksand-Bold",
                fontSize: 16,
                position: "relative",
                top: 6,
              }}
            >
              <TouchableOpacity
                onPressIn={() => navigation.goBack()}
                className="p-3 rounded-full"
                style={{ position: "relative", backgroundColor: "#7b47cc" }}
              >
                <ArrowLeftIcon size="16" color="white" fontWeight="800" />
              </TouchableOpacity>
            </Text>

            <View
              className="space-x-2"
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
                top: 6,
              }}
            >
              <Text
                style={{
                  color: "#111",
                  marginTop: 1,
                  fontFamily: "Nunito-Bold",
                  fontSize: 21,
                  lineHeight: 28,
                  marginLeft: 20,
                }}
              >
                Create Account
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.roundCardBottom1]}>
          <View className="flex-1">
            <View className="py-1 pt-3 px-0 flex-1">
              <Text className="mb-8 mt-3 text-left leading-5 ml-2 text-[18px] font-semibold text-gray-900">
                Create your Fastamoni account free...
              </Text>

              <View className="mb-12">
                <View className="-mb-3">
                  <CustomTextInput
                    control={control}
                    customStyles={{ fontSize: 19, textTransform: 'lowercase' }}
                    name="email"
                    keyboardType="email-address"
                    placeholder="Enter email address"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                      }
                    }}
                  />
                </View>

                <View className="-mb-3">
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
                    onChangeText={(text) => handleChanges(text)}
                    customStyles={{
                      fontSize: 19,
                    }}
                    name="password"
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Enter password"
                    rules={{
                      required: "Password is required",
                      // uncomment this if you want a stronger security
                      // minLength: {
                      //   value: 6,
                      //   message: 'Password must be at least 6 characters long'
                      // },
                      // pattern: {
                      //   value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                      //   message: 'Password must contain at least one uppercase letter and one special character',
                      // },
                    }}
                  />
                  <View style={styles.textContainer} className="space-x-2">
                      <Text style={[styles.passStr, passwordStrength.uppercase && { backgroundColor: '#f0e9fa' }]}>1 Uppercase</Text>
                      <Text style={[styles.passStr, passwordStrength.characters && { backgroundColor: '#f0e9fa' }]}>6 Characters</Text>
                      <Text style={[styles.passStr, passwordStrength.specialSymbol && { backgroundColor: '#f0e9fa' }]}>1 Special Symbol</Text>
                  </View>
                </View>

                <View className="mb-20">
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
                    }}
                    name="confirm_password"
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Confirm password"
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) => {
                        const new_pass = getValues("password");
                        return value === new_pass ? true : "Passwords do not match";
                    },
                    }}
                  />
                </View>
              </View>


              <View style={[styles.buttonContainer1, {marginBottom: 10}]}>
                <View className="mt-16 mb-6">
                  <Text className=" text-center leading-5">
                    <Text>
                      By registering, I agree to TestApp{" "}
                      <Text
                        style={styles.links}
                        onPress={() =>
                          handlePress("https://testApp.com/terms-conditions")
                        }
                      >
                        Terms of Service
                      </Text>{" "}
                      and{" "}
                      <Text
                        style={styles.links}
                        onPress={() =>
                          handlePress("https://testApp.com/privacy-policy")
                        }
                      >
                        Privacy Policy
                      </Text>
                      .
                    </Text>
                  </Text>
                </View>
                <CustomButton
                  text="CREATE ACCOUNT"
                  onPressIn={handleSubmit(handleButtonCreate)}
                  customState={isLoading}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
