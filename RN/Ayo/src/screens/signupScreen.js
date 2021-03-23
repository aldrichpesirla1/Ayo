import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from 'reselect';

import {getSelectSignup, getUsername, getPassword, getPasswordConfirm, getContactNumber, getAddress} from '../redux/signupScreen/selectors';

import {setUsername, setPassword, setPasswordConfirm, setContactNumber, setAddress} from '../redux/signupScreen/actions' 

const actionDispatch = (dispatch) => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setPassword: (password) => dispatch(setPassword(password)),
  setPasswordConfirm: (password_confirm) => dispatch(setPasswordConfirm(password_confirm)),
  setContactNumber: (contact_number) => dispatch(setContactNumber(contact_number)),
  setAddress: (address) => dispatch(setAddress(address))
})

// being consistent with what is in Django
const getLoginData = () => {
  return (
    {
      username: useSelector(getUsername),
      password: useSelector(getPassword),
      password_confirm: useSelector(getPasswordConfirm),
      contact_number: useSelector(getContactNumber),
      address: useSelector(getAddress),
    }
  )
}

const SignUpScreen = () => {
    const signupData = useSelector(getSelectSignup);
    const {setUsername, setPassword, setPasswordConfirm, setContactNumber, setAddress} = actionDispatch(useDispatch());
    const {username, password, password_confirm, contact_number, address} = getLoginData(); 
    // const [usernameInput, recordUsernameInput] = useState('');
    // const [passwordInput, recordPasswordInput] = useState('');
    // const [contactNumberInput, recordContactNumberInput] = useState('');
    // const [addressInput, recordAddressInput] = useState('');
    const navigation = useNavigation();

    /* TODO: 
        - INTEGRATE RED BORDER PARA SA: 
          = LACKING ENTRIES ONPRESS SA REGISTER
          = IF DILI MAO ANG PASSWORD UG PASSWORD_CONFIRM
          = IF SOBRA ANG NUMBERS SA CONTACT NUMBER OR NAAY DILI NUMBER
        - RESTRUCTURE KAY BASIN BATI NA TAN-AWON, I ADDED A PASSWORD CONFIRM TEXTINPUT
        - CONNECT TO BACKEND API (AXIOS.POST)
    */ 
      return (
    // NOTE: THIS COULD BE IMPLEMENTED VIA A FLATLIST SINCE GAMAY RAMAN UG DIFFERENCE ANG TEXTINPUTS
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.FieldContainer}>
              <View>
                <TextInput 
                    placeholder = "Username"
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"
                    onChangeText = {(usernameInput) => setUsername(usernameInput)}
                    style = {styles.UsernameField}/>
              </View>
              <View>
                <TextInput 
                    placeholder = "Password"
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"
                    secureTextEntry
                    onChangeText = {(passwordInput) => setPassword(passwordInput)}
                    style = {styles.OtherFields}/>
              </View>
              <View>
                <TextInput 
                    placeholder = "Confirm Password"
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"
                    secureTextEntry
                    onChangeText = {(passwordInput) => setPasswordConfirm(passwordInput)}
                    style = {styles.OtherFields}/>
              </View>
              <View>
                <TextInput 
                    placeholder = "Contact Number"
                    placeholderTextColor = '#dcdcdc'
                    defaultValue = "09"
                    underlineColorAndroid = "transparent"
                    onChangeText = {(contactNumberInput) => setContactNumber(contactNumberInput)}
                    style = {styles.OtherFields}/>
              </View>
              <View>
                <TextInput 
                    placeholder = "Address"
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"
                    onChangeText = {(addressInput) => setAddress(addressInput)}
                    style = {styles.OtherFields}/>
              </View>
              <View>
                <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                  console.log("Signup data is: ", signupData);                  
                  navigation.navigate("Select Role")
                }}>
                  <Text style = {styles.ButtonText}>NEXT</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;

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
      FieldContainer:{
        width: '100%',
        height: '70%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      UsernameField: {
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
      },
      OtherFields: {
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
        margin: "2.5%",
        marginBottom: '5%',
        alignSelf:'center'
      },
      NextButton: {
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        width: '70%',
        alignSelf:'center',
        alignItems:'center',
        marginTop: '7%',
        marginBottom: '10%',
        borderRadius: 15,
        padding: '1%'
      },
      ButtonText: {
        color: '#ffffff',
        fontSize: 17,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      }
    }
  )