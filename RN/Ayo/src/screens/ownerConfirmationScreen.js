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
    const color = item.username === selectedId ? 'black' : 'black';
    return (
      <View style={styles.touchablesContainer}>
        <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
            setItemData(item);
            setSelectedId(item.username)
            setModalVisible(!modalVisible); 
        }}>
            <View style = {styles.userPreviewTextContainer}>
              <Text style = {styles.userPreviewText}>{item.name}</Text>
              <Text style = {styles.userPreviewText}>{item.address}</Text>
              <Text style = {styles.userPreviewText}>{item.contact_number}</Text>
            </View>
            <Image source={item.valid_id1}
                style={styles.userPreviewImage}
            />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
        <SafeAreaView style={styles.ListContainer}>
          <FlatList
            data={tmpUsers} //list of users goes here
            renderItem={renderItem}
            keyExtractor={(item) => item.username}
            extraData={selectedId} //User identifier
          />
        </SafeAreaView>

        {/* <TouchableOpacity style = {styles.ConfirmButton} >
          <Text style = {styles.ButtonText}>CONFIRM USER</Text>
        </TouchableOpacity>  
        <TouchableOpacity style = {styles.ViewButton} >
          <Text style = {styles.ButtonText}>VIEW DETAILS</Text>
        </TouchableOpacity>   */}
      </View>
      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {false}
            visible={modalVisible}
            onRequestClose = {() => {
                    setModalVisible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:15 , position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              {/* TAN-AWA NI */}
              <VerificationScreen itemData={itemData}/>
          </View>
        </View>
      </Modal>
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
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
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
    item: {
      padding: '2.7%',
      borderWidth: 2,
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
      color: 'red'
    },
    modal : {
      width: '100%',
      height: '100%',
      margin: 0,
      alignItems: "center",
      justifyContent: "center"
    },
    modalContainer : {
      height:'80%',
      flex: 1
    },
    modalView : {
      //backgroundColor: "#FFFFFF"
    },
    touchablesContainer: {
      alignSelf:'center',
      width: '90%',
      margin: '3%',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    touchables: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userPreviewTextContainer: {
      width: '63%',
      marginLeft: '5%',
    },
    userPreviewText: {
      fontSize: 20,
      flexWrap : 'wrap',
      fontFamily: 'Roboto',
    },
    userPreviewImage: {
      width:80, 
      height:80, 
      margin: '5%'
    },
  }
)