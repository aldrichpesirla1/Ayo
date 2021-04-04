import React, {useState} from 'react';
import {StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        ImageBackground, 
        SafeAreaView,
        FlatList, 
      Modal, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import VerificationScreen from '../modals/verificationScreen';
import {Fontisto} from '@expo/vector-icons';

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

const confirmationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedId, setSelectedId] = useState(null);
  const [itemData, setItemData] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.username === selectedId ? "transparent" : "#ffffff";
    const color = item.username === selectedId ? 'white' : 'black';
    return (
      
      // <Item
      //   item={item}
      //   onPress={() => setSelectedId(item.username),
      //   setModalVisible(!modalVisible)}
      //   backgroundColor={{ backgroundColor }}
      //   textColor={{ color }}
      // />
      <View style={styles.touchables}>
                                    <TouchableOpacity item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
                                        setItemData(item);
                                        setSelectedId(item.username)
                                        setModalVisible(!modalVisible);
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

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
        <Text style={styles.titleText}>
          USER CONFIRMATION
        </Text>
        <SafeAreaView style={styles.ListContainer}>
          <FlatList
            data={tmpUsers} //list of users goes here
            renderItem={renderItem}
            keyExtractor={(item) => item.username}
            extraData={selectedId} //User identifier
          />
          <Modal 
                    animationType = "slide"
                    style = {styles.modal}
                    transparent
                    visible={modalVisible}
                    onRequestClose = {() => {
                           setModalVisible(false); 
                    }}
                >
                <View>
                    <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={{margin:15 , position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                                        <Fontisto name="close" size={30}/>
                                </TouchableOpacity>
                                {/* TAN-AWA NI */}
                                <VerificationScreen itemData={itemData}/>
                            </View>
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
        {/* <TouchableOpacity style = {styles.ConfirmButton} >
          <Text style = {styles.ButtonText}>CONFIRM USER</Text>
        </TouchableOpacity>  
        <TouchableOpacity style = {styles.ViewButton} >
          <Text style = {styles.ButtonText}>VIEW DETAILS</Text>
        </TouchableOpacity>   */}
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
    },
    modal : {
      width: '100%',
      height: '100%',
      margin: 0,
      alignItems: "center",
      justifyContent: "center"
    },
    modalContainer : {
          height:'50%',
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: 'row',
    },
    modalView : {
          height: '75%',
          width: '100%',
          borderWidth: 1,
          borderColor: "#F2F2F2",
          //backgroundColor: "#FFFFFF"
    },
touchables: {
    flexDirection: 'row'
},
  }
)