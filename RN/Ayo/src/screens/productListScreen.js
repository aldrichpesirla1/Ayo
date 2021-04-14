//TODO: unsure sa design sa add product, and how to add new data 
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
        FlatList,
        TouchableHighlight,
        Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewProductDetails from '../modals/viewProductDetails'
import {Fontisto} from '@expo/vector-icons';

var tmpProducts = [
  {
      name: "biogesic",
      description: "biogesic",
      price: 10,
      //in_stock: true , 
      product_img: require("../assets/favicon.png")
  },
  {
      name: "bioflu",
      description: "bioflue",
      price: 15,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
      name: "maryjane",
      description: "maryjane",
      price: 100,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "paracetamol",
      description: "paracetamol",
      price: 20,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "mefenamic",
      description: "mefenamic",
      price: 25,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
    {
      name: "alaxan",
      description: "alaxan",
      price: 10,
      //in_stock: true ,
      product_img: require("../assets/favicon.png")
  },
  {
    name: "extrajoss",
    description: "extrajoss",
      price: 1,
      //in_stock: true ,
    product_img: require("../assets/favicon.png")
},
{
  name: "elixir",
  description: "elixir",
  price: 200,
  //in_stock: true ,
  product_img: require("../assets/favicon.png")
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
    const color = item.name === selectedId ? 'white' : 'black';
    return (
      <View style={styles.touchables}>
        <TouchableOpacity item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
          setItemData(item);
          setModalVisible(!modalVisible); 
          
        }}>
            <Text>{item.name}</Text>
            <Image source={item.product_img}
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
      <TouchableOpacity style = {styles.Button} onPress = {() =>{
        setModal2Visible(!modal2Visible);
      }}>
         <Text style = {styles.ButtonText}>ADD PRODUCT</Text>
      </TouchableOpacity>
        <Text style={styles.titleText}>
          PRODUCTS
        </Text>
        <SafeAreaView style = {styles.ListContainer}>
          <FlatList data={tmpProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.description}
          />
        </SafeAreaView>
      </View>

      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={modalVisible}
            onRequestClose = {() => {
                    setModalVisible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:15 , position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <ViewProductDetails itemData={itemData}/>
          </View>
        </View>
      </Modal>

      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={modal2Visible}
            onRequestClose = {() => {
                    setModal2Visible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:15 , position: 'absolute'}} onPress = {() => setModal2Visible(!modal2Visible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <View style = {styles.UsernameField}>
                <TextInput
                placeholder = "Name"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                />
                <TextInput
                placeholder = "Description"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                />
                <TextInput
                placeholder = "Price"
                placeholderTextColor = '#dcdcdc'
                underlineColorAndroid = "transparent"
                />

                <Button
                title= 'Add'/>
              </View>
              
              
          </View>
        </View>
      </Modal>

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
    Button: {
      backgroundColor: '#00d1a3',
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      borderRadius: 15,
      padding: '3%',
      elevation: 3
    },
    ButtonText: {
      color: '#ffffff',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
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
     // backgroundColor: "transparent"
     //mao ni makacause sa di ma touch ang fontisto nga button
    },
  }
)