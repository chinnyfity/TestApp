import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller, useForm } from 'react-hook-form';
import { styles } from '../../themes';




export default function Settings() {

    return (
        <KeyboardAwareScrollView
            style={[styles.scrollView]}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
        >
            <Text>Settings</Text>

        </KeyboardAwareScrollView>
    )
}
