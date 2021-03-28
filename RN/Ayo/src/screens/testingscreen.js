import React from 'react'
import {View, StyleSheet, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native';


//to do: implement redux-- not sure to implement password and confirm password as flatlist
// clean up contact info that shows +63 on its side


const testingscreen = () => {
  const navigation = useNavigation();
  const titles = [
    { title: 'Full Name', },
    { title: 'Username',},
    { title: 'Address', },
    {title : 'Email'},
  ];

  const titles2 = [
    { title: 'Password'},
    {title: 'Confirm Password'}
  ]
  

  return (
          <SafeAreaView>
            <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
              <View style ={styles.FieldContainer}>
              <FlatList 
              keyExtractor={a => a.title} 
              data = {titles}
              renderItem= {({item}) => {
                return (
                <View>
                  <TextInput style = {styles.UsernameField}
                    placeholder = {item.title}
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"/>
                </View>
                );
              }}/>
              <TextInput 
                  placeholder = {"Contact Number"}
                  defaultValue = {"+ 63"}
                  style = {styles.UsernameField}
                  keyboardType = {'number-pad'}
                  placeholderTextColor = '#dcdcdc'
                  underlineColorAndroid = "transparent"
                  />
                <FlatList 
              keyExtractor={passwords => passwords.title} 
              data = {titles2}
              renderItem= {({item}) => {
                return (
                <View>
                  <TextInput style = {styles.UsernameField}
                    placeholder = {item.title}
                    secureTextEntry
                    placeholderTextColor = '#dcdcdc'
                    underlineColorAndroid = "transparent"/>
                </View>
                );
              }}/>
              <View>
                <TouchableOpacity style = {styles.NextButton} onPress = {() => {
                                   
                  navigation.navigate("Select Role")
                }}>
                  <Text style = {styles.ButtonText}>NEXT</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
      

  );
};
export default testingscreen;
const styles = StyleSheet.create({
  textstyle : {
    display: 'flex',
    alignItems: 'center'
  
  },
  Background: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    
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
    marginBottom: '5%',
    alignSelf:'center'
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 17,
    letterSpacing: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
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
});

