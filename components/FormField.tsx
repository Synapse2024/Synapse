import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { icons } from '../constants';


type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
} & TextInputProps; // Extending TextInputProps to accept additional TextInput props

const FormField: React.FC<FormFieldProps> = ({ 
    title, 
    value, 
    placeholder, 
    handleChangeText, 
    otherStyles, 
    ...props 
}) => {

    const [ showPassword, setShowPassword ] = useState(false);

    //Logging the showPassword state for debugging
    useEffect(() => {
        console.log(`showPassword: ${showPassword}`);
      }, [showPassword]);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={!showPassword ? icons.eyeHide : icons.eye} 
                            className="w-6 h-6" 
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
