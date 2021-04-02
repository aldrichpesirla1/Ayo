// TODO:
// IMPLEMENT SUCCESS AND OR FAIL MODAL
// AND ALTER ONPRESS TO SHOW THE MODAL
import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function verificationScreen({itemData}) {
      if(itemData == null)
            return null;

      const {name, username, contact_number, address, valid_id1} = itemData;
      
      const approve = (username) => {
            
      }

      return (
            <View>
                  <Text>`Name: ${name}`</Text>
                  <Text>`Address: ${address}`</Text>
                  <Text>`Contact Number: ${contact_number}`</Text>
                  <Image source={valid_id1} style={styles.images}/>
                  <Button onPress = {() => approve(username)} title='Approve' />
                  <Button onPress = {() => approve(username)} title='Reject' />
            </View>
      )
}

const styles = StyleSheet.create({
      images : {
            height: 150,
            width: 150
      },
      quantity : {
            marginVertical: 10,
            height: 30,
            width: 80,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            borderColor: '#000',
            borderWidth : 1
      }
})
