import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface InputButtonProps {
    value: string | number;
    onPress: () => void;
    variant?: 'number' | 'action' | 'submit';
    selected?: boolean;
}

export default function InputButton({ 
    value, 
    onPress,
    variant = 'number',
    selected = false
}: InputButtonProps) {
    const getButtonStyles = () => {
        const baseStyles = "items-center justify-center rounded-xl shadow-sm active:opacity-80";
        
        const variantStyles = {
            number: "bg-white border border-slate-200 h-[60px]",
            action: "bg-slate-100 border border-slate-200 h-[60px]",
            submit: "bg-emerald-500 h-[60px]"
        };
        
        const selectedStyles = {
            number: "",
            action: selected ? "bg-emerald-500 border-emerald-500" : "",
            submit: ""
        };
        
        return `${baseStyles} ${variantStyles[variant]} ${selectedStyles[variant]}`;
    };
    
    const getTextStyles = () => {
        const baseStyles = "text-xl font-bold";
        
        const variantStyles = {
            number: "text-slate-800",
            action: "text-slate-700",
            submit: "text-white"
        };
        
        const selectedStyles = {
            number: "",
            action: selected ? "text-white" : "",
            submit: ""
        };
        
        return `${baseStyles} ${variantStyles[variant]} ${selectedStyles[variant]}`;
    };
    
    return (
        <TouchableOpacity 
            className={getButtonStyles()}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text className={getTextStyles()}>
                {value}
            </Text>
        </TouchableOpacity>
    );
}