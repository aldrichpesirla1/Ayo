import React from 'react'
import {View, StyleSheet, Text, TextInput, FlatList, SafeAreaView, ImageBackground, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native';

//tarongonon pa ang style maybe di rounded para different siya ug nawng sa buttons
//ug ang alignment sad diay

const customerVerificationScreen = () => {
    const navigartion = useNavigation();
    
    const listOfCustomers = [
        {Fullname: 'john john', ContactNo: '09876543221', Address: 'cebu City', },
        {Fullname: 'tom jerry', ContactNo: '09123456778', Address: 'cebu City', },
        {Fullname: 'jobit jovit', ContactNo: '09231456879', Address: 'cebu City', },
    ]
    return (
        <SafeAreaView>
            <ImageBackground source={require('../backgrounds/AyoLandingPage.png')} style={styles.Background}/>
            <View style ={styles.FieldContainer}>
                <FlatList
                    keyExtractor ={a => a.Fullname}
                    data = {listOfCustomers}
                    renderItem = {({item}) => {
                        return (
                            <Text style = {styles.UsernameField}>{item.Fullname}</Text>
                        );
                    }}/>
            </View>
        </SafeAreaView>
    );
}

export default customerVerificationScreen;

const styles = StyleSheet.create({
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
});

