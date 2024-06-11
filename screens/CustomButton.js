import { Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../themes'
import { ActivityIndicator } from 'react-native-paper'


export default function CustomButton({ text, onPressIn, customState, customStyle, customClass="py-4" }) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPressIn}
      disabled={customState}
      className={`${customClass} rounded-full`} 
      style={[styles.customBtns, styles.btnActive, {backgroundColor: '#7b47cc', opacity: customState ? 0.4 : 1}, customStyle]}
    >    
        <Text className="text-center" style={styles.btnColor}>{text}</Text>
    </TouchableOpacity>
  )

}
