import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  const [usernameInput, recordUsernameInput] = useState('');
  const [passwordInput, recordPasswordInput] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
        <View style={styles.TextFieldContainer}>
          <View>
            <TextInput 
                placeholder = "Username"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                onChangeText = {(usernameInput) => recordUsernameInput(usernameInput)}
                style = {styles.UsernameField}/>
          </View>
          <View>
            <TextInput 
                placeholder = "Password"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                onChangeText = {(passwordInput) => recordPasswordInput(passwordInput)}
                style = {styles.PasswordField}/>
          </View>
          <View>
            <TouchableOpacity style = {styles.LoginButton} onPress = {() => navigation.navigate("Homes")}>
              <Text style = {styles.ButtonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.SignupButton}>
              <Text style = {styles.ButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create(
  {
    Container: {
      flex: 1
    },
    Background: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'relative',
      resizeMode: 'cover'
    },
    TextFieldContainer:{
      width: '100%',
      height: '56%',
      bottom: 0,
      alignSelf: 'flex-end',
      position: 'absolute',
      padding: 15 
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
      marginBottom: '5%',
      alignSelf:'center'
    },
    PasswordField: {
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
      alignSelf:'center'
    },
    LoginButton: {
      backgroundColor: '#00d1a3',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1%',
      elevation: 3
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
    ButtonText: {
      color: '#ffffff',
      fontSize: 17,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    }
  }
)