import { View, Text, TouchableOpacity, Switch, Animated, ScrollView, Alert, Button, TouchableHighlight, Image } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { Buffer } from 'buffer';
import { styles } from '../../themes';
import CustomButton from '../CustomButton';



export default function SplashScreen() {
    const navigation = useNavigation();
   

    return (
        <KeyboardAwareScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
        >
            <SafeAreaView style={[styles.safeArea, {backgroundColor:'#fff'}]}>
                <View style={[styles.roundCardBottom1]}>
                    <View className="space-x-6" style={{ flex: 1 }}>
                        <View className="pt-3 px-0" style={{ flex: 1 }}>
                            <View className="mb-16">
                                <View style={{ alignItems: 'center' }} className="mt-16 flex-1">
                                    <Image 
                                        source={require('../../assets/images/emp.png')}
                                        style={{ height:300, width: '90%', position:'relative', }}
                                        resizeMode="contain"
                                    />
                                </View>
                            
                                <View className="-mb-8 mt-5">
                                    <Text className="text-gray-800 -mt-5" style={{ fontFamily: 'Nunito-ExtraBold', fontSize:26, lineHeight:40, textAlign:'center' }}>The FastaMoni Experience</Text>

                                    <Text className="text-gray-900" style={{ marginTop:5, fontFamily: 'Nunito-Medium', fontSize:17, lineHeight:23, textAlign:'center' }}>Simplified Employee Payment Management</Text>
                                </View>
                            </View>

                            <View style={styles.buttonContainer1}>
                                <CustomButton
                                    text="GET STARTED"
                                    onPressIn={() => navigation.navigate('LoginScreen')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        </KeyboardAwareScrollView>
    )
}
