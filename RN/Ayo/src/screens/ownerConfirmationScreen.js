import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DATA = [ //example list for sample
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "1st Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "2nd Item",
  },
  {
    id: "58694a0f-3da1-4f1f-bd96-145571e29d72",
    title: "3rd Item",
  },
  {
    id: "58694a0f-3da1-461f-bd96-145571e29d73",
    title: "4th Item",
  },
  {
    id: "58694a0f-3da1-421f-bd96-145571e29d74",
    title: "5th Item",
  },
  {
    id: "58694a0f-3da1-4a1f-bd96-145571e29d75",
    title: "6th Item",
  },
  {
    id: "58694a0f-3da1-4b1f-bd96-145571e29d76",
    title: "7th Item",
  },
  {
    id: "58694a0f-3da1-4c1f-bd96-145571e29d77",
    title: "8th Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const confirmationScreen = () => {
  const navigation = useNavigation();

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "transparent" : "#ffffff";
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
        <Text style={styles.titleText}>
          USER CONFIRMATION
        </Text>
        <SafeAreaView style={styles.ListContainer}>
          <FlatList
            data={DATA} //list of users goes here
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId} //User identifier
          />
        </SafeAreaView>
        <TouchableOpacity style = {styles.ConfirmButton} /*onPress={}*/>
          <Text style = {styles.ButtonText}>CONFIRM USER</Text>
        </TouchableOpacity>  
        <TouchableOpacity style = {styles.ViewButton} /*onPress={}*/>
          <Text style = {styles.ButtonText}>VIEW DETAILS</Text>
        </TouchableOpacity>  
      </View>
    </SafeAreaView>
  );
}

export default confirmationScreen;

const styles = StyleSheet.create(
  {
    Container: {
      flex: 1,
      justifyContent: 'center'
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
    ListContainer:{
      width: '80%',
      height: '60%',
      borderWidth: 4,
      borderRadius: 15,
      borderColor: '#ffffff',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    ConfirmButton: {
      backgroundColor: '#00d1a3',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '1.5%',
      elevation: 3
    },
    ViewButton: {
      borderWidth: 2,
      borderColor: '#ffffff',
      backgroundColor: 'transparent',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '5%',
      borderRadius: 15,
      padding: '1.5%'
    },
    ButtonText: {
      color: '#ffffff',
      fontSize: 17,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    titleText:{
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
    }
  }
)