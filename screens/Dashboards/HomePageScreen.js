import { View, Text, TouchableOpacity, Image, ScrollView, Alert, RefreshControl, BackHandler, Button, AppRegistry, Pressable } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { styles } from '../../themes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { BellAlertIcon, CogIcon, PowerIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../../context/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_ROUTES } from '../utils/constants';
import { headers } from '../utils/headers';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function HomePageScreen() {
    const { refreshing, setRefreshing, isPasswordVisible, setIsPasswordVisible, userInfo, userDetails, setUserDetails, isLoading, setIsLoading, } = useContext(AppContext);
    const [active, setActive] = useState(true);
    const navigation = useNavigation();


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // console.log(userInfo);


    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_ROUTES.GET_USER}/${userInfo?.datas?.id}`, {
                method: "GET",
                headers: { ...headers },
            });
            const datas = await response.json();
            // console.log(datas.data);
            setUserDetails(datas.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        getUsers();
    }, []);


    const logoutSession = () => {
        AsyncStorage.removeItem('userInfos');
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
        // navigation.navigate('LoginScreen');
    }

    
    useEffect(() => {
        if(!active){
            console.log('has logged out');
        }
    }, [active]);
    
    
    //userDetails?.avatar
    const imageSource = 
    userDetails?.avatar
    ? 
    { uri: userDetails?.avatar }
    :
    require('../../assets/images/avatar.png');
    
    
    return (
        isLoading ? (
            <LoadingSpinner />
        ) : (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#9Bd35A', '#689F38']}
                    />
                }
                style={{ flex: 1, backgroundColor: '#fff' }}
            >   
                

                <SafeAreaView contentContainerStyle={styles.contentContainerStyle} className="pb-10">
                    <View style={{ height:'auto', paddingBottom:30, }}>
                        <View>
                            <View className="pb-2">

                                {/* <View className="p-3" style={styles.topContainer}>
                                    <View style={styles.notify_house}>
                                        
                                    </View>

                                    <View style={{ position:'relative', top:65, right:10 }}>
                                        <TouchableOpacity> 
                                            <Text style={styles.notifys}>9+</Text>
                                            <BellAlertIcon size="34" color="#085e83" />
                                        </TouchableOpacity>
                                    </View>
                                </View> */}



                                <View className="p-3" style={styles.topContainer}>
                                    <View style={styles.notify_house}>
                                        
                                    </View>

                                    <View 
                                        // style={{ position:'relative', top:65, right:60 }}
                                        className="relative top-[65] right-[57]"
                                    >
                                        <TouchableOpacity> 
                                            <Text style={styles.notifys}>9+</Text>
                                            <BellAlertIcon size="34" color="#085e83" />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={logoutSession} className="absolute left-[57] z-10"> 
                                            <PowerIcon size="30" color="#333" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                
                                <View className="p-3 mb-2" style={[styles.topContainer, {marginTop:0, justifyContent:'flex-start'}]}>
                                    <View className="-ml-2">
                                        <TouchableOpacity onPress={() => navigation.navigate('Profile', {userDetails})}>
                                            {
                                                userDetails?.avatar ?
                                                <Image 
                                                    source={imageSource}
                                                    style={{width: 55, height: 55, borderRadius: 100, borderColor:'white'}}
                                                    resizeMode="contain"
                                                />
                                                :
                                                <UserCircleIcon size={70} color="#777" />
                                            }
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ alignItems: 'left', marginLeft:20, marginTop: 2 }}>
                                        <Text style={{ color: '#555', fontFamily: 'Quicksand-Medium', fontSize: 15, textAlign:'left' }}>
                                            Hello
                                        </Text>
                                        <Text style={{ color: '#444', fontFamily: 'Quicksand-Bold', fontSize: 18, marginTop:-2 }}>
                                            {userDetails?.first_name} {userDetails?.last_name}
                                        </Text>
                                    </View>
                                </View>


                                <View style={styles.cardContainer}>
                                    <View style={styles.cardss}>
                                        <View>
                                            <LinearGradient
                                                colors={['rgba(255, 255, 255, 0.917)', 'rgba(122, 71, 204, 0.6)']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.topBackground}
                                            >
                                                <View style={{ flexDirection: 'row',  alignContent:'center', justifyContent:'space-between' }}>
                                                    <View className="w-3/4 p-3 pr-10">
                                                        <View className="space-x-1" style={{ flexDirection:'row', position:'relative', zIndex:99, marginTop:24, }}>
                                                            <Text style={[styles.digitss2, {fontSize:16, top:2, color:'#555', fontFamily: 'Nunito-Medium',}]}>Your ID:</Text>
                                                            <Text style={styles.digitss2}>473828</Text>
                                                        </View>
                                                    </View>


                                                    <View className="w-1/4">
                                                        <Image 
                                                            source={require('../../assets/images/emp.png')}
                                                            style={{
                                                                width: 150,
                                                                marginRight: -5,
                                                                alignSelf:'flex-end',
                                                                position:'relative',
                                                                top: -95,
                                                            }}
                                                            resizeMode="contain"
                                                        />
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                        
                    </View>

                </SafeAreaView>

            </ScrollView>
        )

    )
}

AppRegistry.registerComponent('default', () => HomePageScreen);