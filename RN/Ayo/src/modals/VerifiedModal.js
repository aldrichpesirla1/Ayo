import React, { Component, useState } from 'react';
import { Modal, Text, ImageBackground, TouchableOpacity, View, Alert,StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function App({toVisible, toggle}) {
  const navigation = useNavigation();

  const modalHeader=(
    <View style={styles.modalHeader}>
      <Text style={styles.title}>Approved</Text>
      <View style={styles.divider}></View>
    </View>
  )

  const modalBody=(
    <View style={styles.modalBody}>
      <Text style={styles.bodyText}>Proceed to User Dashboard?</Text>
    </View>
  )

  const modalFooter=(
    <View style={styles.modalFooter}>
      <View style={styles.divider}></View>
      <View style={{flexDirection:"row-reverse",margin:10}}>
        <TouchableOpacity style={{...styles.actions,backgroundColor:"dodgerblue"}} 
          onPress={() => {
            Alert.alert(toggle())
            navigation.navigate("Homes")
          }}>
          <Text style={styles.actionText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const modalContainer=(
    <View style={styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  )

  const modal = (
    <Modal
    animationType="slide"
      transparent={true}
      visible={toVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
)

  return (
    <View style={styles.container}>
      {modal}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modal:{
    backgroundColor:"#00000099",
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer:{
    backgroundColor:"#f9fafb",
    width:"80%",
    borderRadius:5,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalHeader:{
    alignSelf: 'center'
  },
  text:{
    fontWeight:"bold",
    fontSize:35,
    padding:20,
    color:"#fff",
    letterSpacing: 1,
    alignSelf:'center'
  },
  title:{
    fontWeight:"bold",
    fontSize:20,
    padding:15,
    color:"#000"
  },
  divider:{
    width:"100%",
    height:1,
    backgroundColor:"lightgray"
  },
  modalBody:{
    backgroundColor:"#fff",
    paddingVertical:20,
    paddingHorizontal:10
  },
  modalFooter:{
    //alignItems:'center'
  },
  actions:{
    borderRadius:5,
    marginHorizontal:10,
    paddingVertical:10,
    paddingHorizontal:20
  },
  actionText:{
    color:"#000",
    alignSelf: 'center'
  },
  image:{
    width:'100%',
    height: '100%',
    resizeMode:'cover',
    position:'absolute',
  }
});
