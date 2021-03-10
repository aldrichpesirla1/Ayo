import React, {useLayoutEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Fontisto} from '@expo/vector-icons';

export default function medItemScreen({route, navigation}) {
      const {title, description, image, price} = route.params.itemData;

      useLayoutEffect(() => {
            navigation.setOptions({
                  headerRight: () => {
                        return(
                              <TouchableOpacity>
                                    <Fontisto name="shopping-basket" size={30} style={{marginHorizontal:5}}/>
                              </TouchableOpacity>
                        )
                  }
            })
      })

      return (
            <View>
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
      }
})
