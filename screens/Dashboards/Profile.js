import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'; 
import { Alert, Image, ScrollView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'; 
import { DataTable, Text } from 'react-native-paper'; 
import {ArrowLeftIcon, PencilIcon, PhotoIcon, UserCircleIcon} from 'react-native-heroicons/solid';
import { AppContext } from '../../context/AppContext';
import { launchImageLibrary } from 'react-native-image-picker';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


const Profile = () => { 
    const navigation = useNavigation();
    const { userDetails, isLoading, setProfilePics, } = useContext(AppContext);
    const [picsLoaded, setPicsLoaded] = useState(false);
    const [pics, setPics] = useState('');


    const styles = StyleSheet.create({ 
        container: { 
            padding: 0,
            marginTop:10,
        },
        tableHeader: { 
            backgroundColor: '#DCDCDC', 
        },
        cellText: {
            fontSize: 18,
            fontFamily: 'Nunito-Bold',
            marginTop: 0,
            paddingBottom: 0,
        },
        rows: {
            borderBottomWidth: 1,
            borderColor: '#ddd',
            marginTop: 10,
            paddingTop: 0,
            paddingBottom: 7,
            marginBottom: 13,
            backgroundColor: '#fff',
            
            elevation: 2, // Android
            shadowColor: '#666',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2, // iOS
            shadowRadius: 4, // iOS
            
        },
        rightAlign: {
            textAlign: 'right',
        },
        leftCell: {
            flex: 1,
            // marginTop: -20,
        },
        rightCell: {
            justifyContent: 'flex-end',
        },

        iconButton: {
            backgroundColor: '#fff',
            borderColor:'#333',
            borderRadius: 50,
            padding: 8,
            alignItems: 'center',
            opacity: 1,
            position:'absolute',
            right: -20,
            top: 0,
        },
        
    });


    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }


    const handleChoosePhoto = async () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        }
        try {
            await launchImageLibrary(options, async response => {
                if(response.didCancel){
                    setToastMsg('Cancelled image selection');
                } else if(response.errorCode == "permission"){
                    setToastMsg('Permission not allowed');
                } else if(response.errorCode == "others"){
                    setToastMsg(response.errorMessage);
                } else if(response.assets[0].fileSize > 10485760){ // 10mb
                    Alert.alert(
                        "Error!",
                        'Maximum image file has exceeded! Please choose another smaller image',
                        [{text: 'OK'}],
                    );
                } else {
                    setPics(response.assets[0].base64);
                    setProfilePics(response.assets[0].base64);
                    setPicsLoaded(true);

                    const customData = {
                        photo: response.assets[0].base64
                    }
                }
            });
        } catch (error) {
            console.error('Error while choosing photo:', error);
        }
    };


    const imageSource = 
    userDetails?.avatar
    ? 
    { uri: userDetails?.avatar }
    :
    require('../../assets/images/avatar.png');



    return ( 
        <ScrollView style={{ backgroundColor:'#fff' }}>
            <View style={{ position:'absolute', zIndex:9 }}>
                <View className="p-3" style={[{justifyContent:'flex-start'}]}>
                    <Text style={{ color: '#333', fontFamily: 'Quicksand-Bold', fontSize: 16, position:'relative', top:3 }}>
                        <TouchableOpacity 
                            onPressIn={()=> navigation.goBack()}
                        >
                            <ArrowLeftIcon size="22" color="#fff" fontWeight="800" />
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>


            <View>
                <View className="py-6 pt-0" style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        
                    <View className="flex-row">
                        <View 
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:'rgba(122, 71, 204, 0.917)',
                                width: '100%',
                                padding: 20,
                                borderBottomRightRadius: 30,
                                borderBottomLeftRadius: 30,
                            }}
                        >
                            <TouchableOpacity 
                                onPress={() => handleChoosePhoto()} 
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            > 
                                <Text style={{ position:'absolute' }}>    
                                    {picsLoaded && <LoadingSpinner />}
                                </Text>

                                <View className="rounded-full" style={{ borderColor:'#fff', borderWidth:2, backgroundColor:'#333' }}>
                                    {
                                        userDetails?.avatar ?
                                        <Image
                                            className="rounded-full"
                                            source={imageSource}
                                            style={{ width: 110, height: 110, opacity:picsLoaded ? 0.4 : 1 }}
                                        />
                                        :
                                        <UserCircleIcon size={70} color="#777" />
                                    }
                                </View>
                                <View style={styles.iconButton}>
                                    <PhotoIcon size={26} color="#854dde" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                {
                    isLoading ? <LoadingSpinner /> : (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('UpdateUsers')}>
                                <Text style={{ position:'relative', left:'74%', top: 12, color:'#666' }}>Edit Profile</Text>
                                <PencilIcon size="22" color="#333" fontWeight="800" style={{ position:'relative', left:'92%', top: -10 }} />
                            </TouchableOpacity>

                            <DataTable style={[styles.container, {backgroundColor:'white', marginTop: -6}]}>
                                <DataTable.Row>
                                    <DataTable.Cell style={styles.leftCell}>
                                        <Text style={[styles.cellText, { fontSize:16 }]}>Full Names</Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell style={styles.rightCell}>
                                        <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.cellText, { textAlign:'right', fontSize:16, textTransform:'capitalize' }]}>{userDetails?.first_name} {userDetails?.last_name}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row style={{marginTop:-10}}>
                                    <DataTable.Cell style={styles.leftCell}>
                                        <Text style={[styles.cellText, { fontSize:16 }]}>Email</Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell style={styles.rightCell}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cellText, { textAlign:'right', fontSize:16, }]}>{userDetails?.email}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row style={{marginTop:-10}}>
                                    <DataTable.Cell style={styles.leftCell}>
                                        <Text style={[styles.cellText, { fontSize:16 }]}>Job</Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell style={styles.rightCell}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.cellText, { textAlign:'right', fontSize:16, }]}>Leader</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </DataTable> 
                        </>
                    )
                }
            </View>
        </ScrollView>
    )
}

export default Profile; 
