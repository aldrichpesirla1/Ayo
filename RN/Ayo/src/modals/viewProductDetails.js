import React, {useLayoutEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, Button} from 'react-native'

export default function ViewProductDetails({itemData}) {
      if(itemData == null)
            return null;

      const {name, description, price, in_stock, product_img} = itemData;

      return (
            <View style = {styles.UsernameField}>
                  <Text>Name: {name}</Text>
                  <Text>Description: {description}</Text>
                  <Text>Price: {price}</Text>
                  <Image source={product_img} style={styles.images}/>
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
      },
      UsernameField: {
            width: '70%',
            padding: '3%',
            borderRadius: 15,
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 17,
            letterSpacing: 1,
            marginBottom: '5%',
            alignSelf:'center',
            position: 'absolute'
          },
      
})
