import { View, Text, TextInput } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { styles } from '../themes'


// export default function CustomTextInput({ control, ref, name, editable, multiline, numberOfLines, textAlignVertical, rules = {}, autoCapitalize, placeholder, secureTextEntry, keyboardType, customStyles, defaultValue, onChangeText = () => {} }) {

const CustomTextInput = forwardRef((props, ref) => {
  const { control, isShowError=true, name, editable, multiline, numberOfLines, textAlignVertical, rules = {}, maxLength, autoCapitalize, placeholder, secureTextEntry, keyboardType, digits, customStyles, defaultValue, onChangeText = () => {} } = props;

  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setValue: (value) => {
      if (inputRef.current) {
        inputRef.current.setNativeProps({ text: value });
      }
    }
  }));


  return (
    <Controller
        control={control}
        name={name}
        maxLength={maxLength}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: {value, onChange, onBlur}, fieldState: {error} }) => 
            <>
              <TextInput
                  style={[styles.inputBox, customStyles, { borderBottomColor: error ? '#f59090' : '#adc5ad' }]} 
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  value={value}
                  multiline={multiline}
                  ref={inputRef}
                  // defaultValue={value}
                  editable={editable}
                  numberOfLines={numberOfLines}
                  textAlignVertical={textAlignVertical}
                  // defaultValue={defaultValue}
                  onChangeText={(text) => {
                    const capitalizedText = text.replace(/\b\w/g, char => char.toUpperCase());
                    onChange(autoCapitalize === "words" ? capitalizedText : text);
                    onChangeText(text);
                  }}
                  onBlur={onBlur}
                  secureTextEntry={secureTextEntry}
              />
              {(error && isShowError) && <Text style={{ color:'#fa1f1f', alignSelf:'stretch', textAlign:'right', marginTop:-21, marginBottom:20, fontSize: 15, paddingRight:10, position:'relative', zIndex:9 }}>{ error.message || 'Error'}</Text>}
            </>
        }
    />
  )
// }
});

export default CustomTextInput;