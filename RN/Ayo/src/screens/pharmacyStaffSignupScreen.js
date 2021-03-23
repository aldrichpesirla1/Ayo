import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground,
        FlatList,
        SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const pharmacyStaffSignUpScreen = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style= {styles.Container}>
            <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style={styles.FieldContainer}>
                <View>
                <TouchableOpacity style = {styles.NextButton} onPress = {() => {                  
                    navigation.navigate("Homes")
                }}>
                    <Text style = {styles.ButtonText}>NEXT</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default pharmacyStaffSignUpScreen;

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