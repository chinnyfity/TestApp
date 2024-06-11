import React, { useState, useContext, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './AuthScreen/LoginScreen';
import RegisterScreen from './AuthScreen/RegisterScreen';
import TabNavigators from './Dashboards/TabNavigators';
import SplashScreen from './AuthScreen/SplashScreen';
import Profile from './Dashboards/Profile';
import UpdateUsers from './UpdateUsers';
import Settings from './Dashboards/Settings';

const Stack = createNativeStackNavigator();

export default function ScreenHouse() {


    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{ 
                    headerShown: false,
                }}
                initialRouteName="SplashScreen"
                // initialRouteName="MainDashboard"
                // initialRouteName="EnterPin"
                // initialRouteName="LoginScreen"

            >

                <Stack.Screen 
                    name="SplashScreen" 
                    options={{headerShown: false}} 
                    component={SplashScreen} 
                />

                <Stack.Screen 
                    name="LoginScreen" 
                    options={{headerShown: false}} 
                    component={LoginScreen} 
                />

                <Stack.Screen 
                    name="RegisterScreen" 
                    options={{headerShown: false}} 
                    component={RegisterScreen} 
                />
                
                <Stack.Screen 
                    name="Profile" 
                    options={{headerShown: false}} 
                    component={Profile} 
                />
                
                <Stack.Screen 
                    name="UpdateUsers" 
                    options={{
                        headerShown: true,
                        title: 'Edit Profile',
                        headerTitleStyle: {
                            fontSize: 20,
                            fontFamily: 'Quicksand-Bold',
                        },
                    }}
                    component={UpdateUsers} 
                />

                <Stack.Screen 
                    name="Settings" 
                    options={{headerShown: false}} 
                    component={Settings} 
                />

                {/* <Stack.Screen name="Notifications"
                    options={{
                    headerShown: true,
                    title: 'Notifications',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontFamily: 'Quicksand-Bold',
                    },
                    }}
                    component={Notifications}
                /> */}
                
                <Stack.Screen name="MainDashboard" options={{headerShown: false}} component={TabNavigators} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
