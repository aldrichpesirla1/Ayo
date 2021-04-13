import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        Modal,
        Image,
        FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const tmpUsers = [
  {
      name: "mmm",
      contact_number: "mmm",
      username: "mmm",
      address: "mmm",
      valid_id1: require("../assets/favicon.png")
  },
  {
      name: "yep",
      contact_number: "yep",
      username: "yep",
      address: "yep",
      valid_id1: require("../assets/favicon.png")
  },
  {
      name: "Juan Dela Cruz",
      contact_number: "0922331232",
      username: "mrlabalaba",
      address: "Kabangkalan, Mandaue",
      valid_id1: require("../assets/favicon.png")
  },
    {
      name: "Tom",
      contact_number: "Tom",
      username: "Tom",
      address: "Cebu, Mandaue",
      valid_id1: require("../assets/favicon.png")
  },
    {
      name: "Jerry",
      contact_number: "Jerry",
      username: "Jerry",
      address: "Jerry, Mandaue",
      valid_id1: require("../assets/favicon.png")
  },
    {
      name: "Pedro",
      contact_number: "Pedro",
      username: "Pedro",
      address: "Pedro, Mandaue",
      valid_id1: require("../assets/favicon.png")
  },
  {
    name: "Penduko",
    contact_number: "Penduko",
    username: "Penduko",
    address: "Penduko, Mandaue",
    valid_id1: require("../assets/favicon.png")
},
{
  name: "Jojo",
  contact_number: "Jojo",
  username: "Jojo",
  address: "Jojo, Mandaue",
  valid_id1: require("../assets/favicon.png")
}
]


const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const productList = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [itemData, setItemData] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.username === selectedId ? "transparent" : "#ffffff";
    const color = item.username === selectedId ? 'white' : 'black';
    return (
      <View style={styles.touchables}>
        <TouchableOpacity item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
        }}>
            <Text>{item.name}</Text>
            <Image source={item.valid_id1}
            // <Image source={{uri: item.valid_id1}}
                style={{width:150, height:150}}
            />
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
        <Text style={styles.titleText}>
          PRODUCTS
        </Text>
        <SafeAreaView style = {styles.ListContainer}>
          <FlatList data={tmpUsers}
                    renderItem={renderItem}
                    keyExtractor={item => item.username}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

export default productList;

const styles = StyleSheet.create(
  {
    Container: {
      flex:1  
    },
    Background: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'relative',
      resizeMode: 'cover'
    },
    ContentContainer:{
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      position: 'absolute',
      justifyContent: 'center',
    },
    titleText: {
      color: '#ffffff',
      fontSize: 29,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: '2%',
      textShadowRadius: 5,
      textShadowOffset: {width: 0, height: 2},
      textShadowColor: 'grey'
    },
    ListContainer:{
      width: '90%',
      height: '80%',
      borderWidth: 4,
      borderRadius: 15,
      borderColor: '#ffffff',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    touchables: {
      alignSelf:'center',
      alignItems: 'center',
      width: '90%',
      margin: '3%',
      borderRadius: 15,
      backgroundColor: 'white'
    },
    item: {
      padding: '2.7%',
      borderWidth: 2,
      borderColor: '#ffffff',
      width: '90%',
      borderRadius: 35,
      marginVertical: '5.2%',
      alignSelf: 'center',
      alignItems: 'center',
      elevation: 2
    },
    itemText: {
      fontSize: 17,
      fontFamily: 'Roboto',
      letterSpacing: 0.3,
    },
  }
)