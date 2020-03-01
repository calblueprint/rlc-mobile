import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "react-native";


import Colors from '../constants/Colors';

export default function FooterIcon(props) {
  return (
    <Ionicons
      name={`${Platform.OS === 'ios'? 'ios-':'md-'}${props.name}${props.focused ? '' : '-outline'}`}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
