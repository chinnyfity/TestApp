import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BuildingLibraryIcon, UserIcon, } from 'react-native-heroicons/solid';
import HomePageScreen from './HomePageScreen';
import { Alert, Text, View } from 'react-native';
// import Supports from './Supports';
import Profile from './Profile';

const Tab = createBottomTabNavigator();


export default function TabNavigators() {
    
    return (  
        <Tab.Navigator
            initialRouteName='MainDashboard'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: "#888",
                tabBarActiveBackgroundColor:'#7a47cc',
                headerShown: false,
                tabBarLabelStyle: { 
                    fontSize: 11.5,
                    fontWeight:'500',
                    fontFamily:'Quicksand-Bold',
                    marginTop:-3,
                    position:'relative',
                    top:-3,
                },
                tabBarStyle: {
                    height: 50,
                    marginLeft: 40,
                    paddingHorizontal: 4,
                    marginHorizontal: 50,
                    marginVertical: 15,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    position: 'absolute',
                    borderTopWidth: 0,
                    borderRadius: 100,
                },
                tabBarItemStyle: {
                    paddingTop: 0,
                    height: 46,
                    width: 60,
                    borderRadius: 100,
                    marginTop: 2,
                },
            })}
        >

            <Tab.Screen
                name="MainDashboard_"
                children={() => {
                    return (<HomePageScreen />)
                }}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <BuildingLibraryIcon size="25" color={color} />
                    ),
                }}
            />

            {/* <Tab.Screen
                name="Supports"
                children={() => {
                    return <Supports />
                }}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Support',
                    tabBarIcon: ({ color }) => (
                        <>
                            <LifebuoyIcon size="25" color={color} />
                        </>
                    ),
                }}
            /> */}

            <Tab.Screen
                name="Account"
                children={() => {
                    return <Profile />
                }}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <UserIcon size="25" color={color} />
                    ),
                }}
            />
            

        </Tab.Navigator>    
            
    )
}
