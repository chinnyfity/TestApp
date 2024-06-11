import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    BackHandler,
  } from "react-native";
  import React, { useContext, useEffect, useRef, useState } from "react";
  
  import { SafeAreaView } from "react-native-safe-area-context";
  import {
    useFocusEffect,
    useNavigation,
    useNavigationState,
  } from "@react-navigation/native";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
 
  import { Controller, useForm } from "react-hook-form";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Buffer } from "buffer";
import { AppContext } from "../context/AppContext";
import { styles } from "../themes";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import { Dropdown } from "react-native-searchable-dropdown-kj";
import { API_ROUTES } from "./utils/constants";
import { headers } from "./utils/headers";


    
export default function UpdateUsers () { 
    const { modalVisible, isLoading, setIsLoading, userDetails } = useContext(AppContext);
    const navigation = useNavigation();

    // const [value, setValue] = useState(null);
    const [isRoles, setIsRoles] = useState(false);
    
    
    const {control, handleSubmit, setValue, reset, formState: {errors}} = useForm();

    const jobRoles = [
        { id: 1, name: "Leader" },
        { id: 2, name: "Backend Developer" },
        { id: 3, name: "Frontend Developer" },
        { id: 4, name: "DevOps" },
        { id: 5, name: "Marketer" },
        { id: 6, name: "UI/UX" },
        { id: 7, name: "Admin" },
    ];


    const handleButtonUpdate = async (data) => {
        setIsLoading(true);
        try {
        const response = await fetch(`${API_ROUTES.UPDATE_USER}/${userDetails.id}`, {
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
                Alert.alert("Success!", "Your profile has been updated!");
                navigation.navigate('Profile');
            }
        }
        } catch (error) {
            Alert.alert("Error!", error.toString());
            setIsLoading(false);
        }
    }



  
    return (
        <KeyboardAwareScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
        >

            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.roundCardBottom1]}>
                    <View className="space-x-6" style={{ flex: 1 }}>
                        <View className="py-3_ pt-4 px-0" style={{ flex: 1 }}>
                            
                            <View className="mb-16">
                                <View className="mb-0">
                                    <Text className="text-gray-900 text-[16px] mb-1">Select Job Role</Text>
                                    <Controller
                                        control={control}
                                        name="jobs"
                                        defaultValue={[]}
                                        render={({ field: {value, onChange}, fieldState: {error} }) => (
                                            <>
                                                <Dropdown
                                                    style={[styles.dropdown, {padding: 5, minHeight: 53, marginBottom:25,}]}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    inputSearchStyle={styles.inputSearchStyle}
                                                    data={jobRoles}
                                                    maxHeight={300}
                                                    labelField="name"
                                                    valueField="id"
                                                    placeholder="-Select Role-"
                                                    searchPlaceholder="Search..."
                                                    value={value}
                                                    onFocus={() => setIsRoles(true)}
                                                    onBlur={() => setIsRoles(false)}
                                                    onChange={(item) => {
                                                        setIsRoles(false);
                                                        // setSelectedType(item.id);
                                                        onChange(item.id);
                                                        setValue("job", item.name);
                                                    }}
                                                />
                                                {error && <Text style={{ color:'#fa1f1f', alignSelf:'stretch', marginTop:-12, marginBottom:10, fontSize: 15 }}>{ error.message || 'Error'}</Text>}

                                                <CustomTextInput 
                                                    control={control}
                                                    customStyles={{ display:'none', }}
                                                    name="job"
                                                    rules={{
                                                        required: 'User role is required'
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                </View>

                                <View className="-mt-3">
                                    <Text className="text-gray-900 text-[16px] mb-1">Enter Names</Text>
                                    <CustomTextInput
                                        defaultValue={`${userDetails.first_name} ${userDetails.last_name}`}
                                        control={control}
                                        customStyles={{
                                        fontSize: 20,
                                        }}
                                        name="name"
                                        placeholder="Enter your names"
                                        rules={{
                                            required: "Your name is required",
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.buttonContainer1}>
                                <CustomButton
                                    text="UPDATE PROFILE"
                                    onPressIn={handleSubmit(handleButtonUpdate)}
                                    customState={isLoading}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        </KeyboardAwareScrollView>
    )
}
