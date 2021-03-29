import React, {useLayoutEffect, useState} from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native'
import {Fontisto} from '@expo/vector-icons';

export default function medItemScreen({route, navigation}) {
      const {title, description, image, price} = route.params.itemData;
      const [modalVisible, setModalVisible] = useState(false);
      const [quantity, setQuantity] = useState(0);
      
      useLayoutEffect(() => {
            navigation.setOptions({
                  headerRight: () => {
                        return(
                              <TouchableOpacity onPress = {() => setModalVisible(true)}>
                                    <Fontisto name="shopping-basket" size={30} style={{marginHorizontal:5}}/>
                              </TouchableOpacity>
                        )
                  }
            })
      })

      return (
            <View>
                  <Modal 
                        animationType = "slide"
                        style = {styles.modal}
                        visible = {modalVisible}
                        transparent
                        onRequestClose = {() => {
                              // Alert.alert("Modal closed")
                              setModalVisible(false)
                        }}
                  >
                        <View style={styles.modalContainer}>
                              <View style={styles.modalView}>
                                    <TouchableOpacity onPress = {() => setModalVisible(false)}>
                                          <Fontisto name="close" size={30}/>
                                    </TouchableOpacity>
                                    <Text>Add to basket</Text>
                                    <View style={styles.quantity}>
                                          <Fontisto name="plus-a" size={15} styles={{flex:1}} onPress={() => setQuantity(quantity+1) }/>
                                          <TextInput styles={{flex:3, }} value={quantity === 0 ? "" : quantity.toString()} placeholder="0" onChangeText={(newText) => {
                                                // NO CHECK YET FOR NON-NUMBERS
                                                if(newText.length === 0 || isNaN(Number(newText)))
                                                      setQuantity(0)
                                                else 
                                                      setQuantity(Number(newText))
                                                
                                          }}/>
                                          {/* TENTAIVE PA NI, NEED TO BE REFACTORED */}
                                          <Fontisto name="minus-a" size={15} styles={{flex:1}} onPress={() => {quantity - 1 < 1 ? setQuantity(0) : setQuantity(quantity-1)}}/>
                                    </View>
                                          <Text>{Number(price.split(" ")[0]) * quantity}</Text>
                              </View>
                        </View>
                  </Modal>
                  <Image source={image} style={styles.images}/>
                  <Text>{title}</Text>
                  <Text>{description}</Text>
                  <Text>{price}</Text>
            </View>
      )
}

const styles = StyleSheet.create({
      images : {
            height: 150,
            width: 150
      },
      modal : {
            margin: 0,
            alignItems: "center",
            justifyContent: "center"
      },
      modalContainer : {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: 'row',
      },
      modalView : {
            flex: 1,
            height: '50%',
            width: 100,
            borderWidth: 1,
            borderColor: "#F2F2F2",
            backgroundColor: "#FFFFFF"
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
