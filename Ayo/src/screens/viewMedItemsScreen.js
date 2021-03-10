import React from 'react'
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, Touchable} from 'react-native'
import {useNavigation} from '@react-navigation/native';

import {medItems} from '../mocks/medItems';

export default function viewMedItemsScreen() {
      const navigation = useNavigation();

      return (
            <View>
                  <FlatList 
                        data = {medItems}
                        keyExtractor = {(item) => item.id}
                        renderItem = { ({item}) => {
                              return (
                                    <TouchableOpacity onPress= {() => navigation.navigate("MedItems", {itemData:item})}>
                                          <View style={styles.container}>
                                                <Image source={item.image} style={styles.images} />
                                                <View style={styles.textContainer}>
                                                      <Text style={styles.title}>{item.title}</Text>
                                                      <Text>{item.price}</Text>
                                                </View>
                                          </View>
                                    </TouchableOpacity>
                              )
                        }}                        
                  />
            </View>
      )
}

const styles = StyleSheet.create({
      container : {
            flexDirection: 'row',
            margin: 10, 
            borderBottomColor : 'gray',
            borderBottomWidth: 2,
      },
      images : {
            height: 100,
            width: 100,
            marginVertical: 3,
      },
      textContainer: {
            justifyContent:"center"
      },
      title : {
            fontWeight: 'bold',
      }
})
