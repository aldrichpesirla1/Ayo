import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {getRole, getSelectSignup} from '../redux/signupScreen/selectors';
import {setRole} from '../redux/signupScreen/actions';

const actionDispatch = (dispatch) => ({
  setRole: (role) => dispatch(setRole(role)),
})

const roleSelectScreen = () => {
    const {setRole} = actionDispatch(useDispatch());
    const navigation = useNavigation();

    return (
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.ButtonContainer}>
              <View>
                <Text style={styles.Text}>USER TYPE</Text>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Customer");
                  navigation.navigate("Customer Sign Up")
                }}>
                  <Text style = {styles.ButtonText}>CUSTOMER</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Pharmacy Worker")
                  navigation.navigate("Staff Sign Up")
                }}>
                  <Text style = {styles.ButtonText}>PHARMACY STAFF</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                  setRole("Owner")
                  navigation.navigate("Owner Sign Up")}
                }>
                  <Text style = {styles.ButtonText}>PHARMACY OWNER</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    );
}

export default roleSelectScreen;

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
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      }
    }
  )