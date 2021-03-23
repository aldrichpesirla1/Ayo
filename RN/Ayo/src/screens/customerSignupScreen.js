import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// copied from roleSelectScreen.js
//still need to clean up on medical history and upload ID and how to connect data from this to back-end

const customerSignUpScreen = () => { 
    const navigation = useNavigation();
    

    return (
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.ButtonContainer}>
              <View>
                <Text style={styles.Text}>CUSTOMER</Text>
                <TouchableOpacity style = {styles.Button} onPress = {() => navigation.navigate("Homes")}>
                  <Text style = {styles.ButtonText}>UPLOAD ID</Text>
                </TouchableOpacity>
                  <TextInput 
                    placeholder = "MedicalHistory"
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"
              
                    style = {styles.MedicalHistoryField}/>
                
                <TouchableOpacity style = {styles.SignupButton} onPress = {() => navigation.navigate("Homes")}>
              <Text style = {styles.ButtonText}>SIGN UP</Text>
            </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    );
}

export default customerSignUpScreen;

const styles = StyleSheet.create(
    {
      Container: {
        flex: 1
      },
      Background: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'relative',
        resizeMode: 'cover'
      },
      ButtonContainer:{
        width: '100%',
        height: '70%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      Button: {
        backgroundColor: '#00d1a3',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '7%',
        borderRadius: 15,
        padding: '3%',
        elevation: 3
      },
      Text:{
        color: '#ffffff',
        fontSize: 40,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center'
      },
      ButtonText: {
        color: '#ffffff',
        fontSize: 15,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      },
      SignupButton: {
      borderWidth: 2,
      borderColor: '#ffffff',
      backgroundColor: 'transparent',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1%'
    },
    MedicalHistoryField: {
        width: '70%',
        padding: '1%',
        borderRadius: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
        marginTop: '3%',
        marginBottom: '5%',
        alignSelf:'center'
      }
    }
  )