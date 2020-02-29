import React from "react";
import { Platform, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { normalize } from "../utils/Normalize.js";

function TabBar({ state, descriptors, navigation }) {
    return (
      <View style={{...styles.tabContainer,  ...{flexDirection: 'row'}}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

const styles = StyleSheet.create({
  tabContainer : {
    backgroundColor : "#57A4D6"
  }
})

export default TabBar;