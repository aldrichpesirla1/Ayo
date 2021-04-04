import React, { useState , useEffect} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        BackHandler,
        Alert} from 'react-native';
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

    useEffect(() => {
      const backAction = () => {
        Alert.alert("Warning", "Go back the Log In screen? You will lose all your Sign Up information.", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.navigate("Log In") }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  

    return (
        <SafeAreaView style= {styles.Container}>
          <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.ContentContainer}>
              <Text style={styles.Title}>SELECT USER TYPE</Text>
              <View style = {styles.ButtonContainer}>
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
      ContentContainer:{
        width: '100%',
        height: '70%',
        bottom: 0,
        alignSelf: 'flex-end',
        position: 'absolute',
        justifyContent: 'center',
      },
      ButtonContainer:{
        width: '80%',
        height: 'auto',
        borderWidth: 4,
        borderRadius: 15,
        borderColor: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
      },
      Button: {
        backgroundColor: '#ffffff',
        width: '90%',
        alignSelf:'center',
        alignItems:'center',
        margin: '5%',
        borderRadius: 15,
        padding: '3%',
        elevation: 3
      },
      Title:{
        color: '#ffffff',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        textShadowRadius: 5,
        textShadowOffset: {width: 0, height: 2},
        textShadowColor: 'grey'
      },
      ButtonText: {
        color: '#00d1a3',
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      }
    }
  )