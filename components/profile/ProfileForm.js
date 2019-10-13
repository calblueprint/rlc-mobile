import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ProfileForm extends Component {
     render() { return (
          <View behavior="padding" style={styles}>

               <View> 
               <Text style={styles.formHeader}>
                    Basic Information 😊
               </Text>
               </View>

               <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Sign In</Text>
               </TouchableOpacity>
          </View>
     )
     }
}

const styles = StyleSheet.create({
     buttonContainer: {
          backgroundColor: '#38A5DB',
          paddingVertical: 15,
          marginBottom: 20,
          borderRadius: 5
      },
      buttonText: {
          textAlign: 'center',
          color: '#FFFFFF',
          fontWeight: '600'
      },
      input: {
          height: 40,
          marginBottom: 20,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#3b3b3b',
          color: '#000000',
      },
      formHeader: {
           fontSize: 14,
           fontWeight: 600,
      },
      inputHeader: {
          fontSize: 12,
          fontWeight: 400,
      }  
     })