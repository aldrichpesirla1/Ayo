import React, {useState, useEffect} from 'react';
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
        Platform,
        TouchableHighlight,
        Button,
        ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewProductDetails from '../modals/viewProductDetails'
import AddProductFail from '../modals/addProductFail'
import AddProductSuccess from '../modals/addProductSuccess'
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
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  
    console.log(result); //Details of the uploaded image
  
    if (result.cancelled)
      return null;
  
    setImage(result.uri); //Do not remove this as this is to display the image
  };
  

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "transparent" : "#ffffff";
    const color = item.name === selectedId ? 'white' : 'black';
    return (
      <View style={styles.touchablesContainer}>
        <TouchableOpacity style = {styles.touchables} item={item} backgroundColor = {{backgroundColor}} textColor = {{color}} onPress = {() => {
          setItemData(item);
          setModalVisible(!modalVisible); 
          
        }}>
            <View>
              <Text style = {styles.productPreviewText}>{item.name}</Text>
              <Text style = {styles.productPreviewText}>Price: ₱{item.price}</Text>
            </View>
            <Image source={item.product_img}
                style={styles.productPreviewImage}
            />
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView style= {styles.Container}>
      <ImageBackground source={require('../backgrounds/AyoDefaultBG.png')} style={styles.Background}/>
      <View style = {styles.ContentContainer}>
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
            <View style={styles.header}>
              <TouchableOpacity style={{margin:15 , alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setModalVisible(!modalVisible)}>
                <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              </View>
              <ScrollView style = {styles.productDetailsScrollView}>
                <ViewProductDetails itemData={itemData}/>
              </ScrollView>
              <TouchableOpacity style={styles.addProductButton}>
                <Text style = {styles.addProductButtonText}>
                  ADD TO BASKET
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
     <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={successVisible}
            onRequestClose = {() => {
                    setSuccessVisible(false); 
            }}>
      <View style={styles.addSuccessContainer}>
        <AddProductSuccess/>
        <TouchableOpacity>
          <Text style={{marginBottom:2,fontSize: 20, color: 'dodgerblue', fontWeight: 'bold', alignSelf: 'flex-end'}} 
          onPress ={() => setSuccessVisible(!successVisible)}>
            OK
          </Text>

        </TouchableOpacity>
      </View>
      </Modal> 

      <Modal 
            animationType = "slide"
            style = {styles.modal}
            transparent = {true}
            visible={failVisible}
            onRequestClose = {() => {
                    setFailVisible(false); 
            }}>
        <View style={styles.addFailContainer}>
        <AddProductFail/>
        <TouchableOpacity>
          <Text style={{marginBottom:2,fontSize: 20, color: 'dodgerblue', fontWeight: 'bold', alignSelf: 'flex-end'}} 
          onPress ={() => setFailVisible(!failVisible)}>
            OK
          </Text>
        </TouchableOpacity>
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
    },
    ListContainer:{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    addProductDetailsField: {
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
      marginTop: '3%',
      marginBottom: '5%',
      alignSelf:'center',
      position: 'absolute'
    },
    touchablesContainer: {
      alignSelf:'center',
      width: '95%',
      margin: '1.5%',
      borderRadius: 15,
      backgroundColor: 'white',
    },
    touchables: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    productPreviewText: {
      fontSize: 18,
      fontFamily: 'Roboto',
    },
    productPreviewImage: {
      width:80, 
      height:80, 
      marginVertical: '5%'
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
    modalContainer : {
      height: '85%',
      marginTop: 'auto',
      backgroundColor:'#ffffff',
      borderTopWidth: 7,
      borderTopColor: '#dcdcdc',
      alignItems:'stretch',
    },
    modalView : {
      height: '100%'
     // backgroundColor: "transparent"
     //mao ni makacause sa di ma touch ang fontisto nga button
    },
    addProductButton: {
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '5%',
      padding: '2%',
      marginBottom: '8%'
    },
    addProductButtonText: {
      color: '#ffffff',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    header:{
      width:"100%",
      height:40,
      alignItems:'flex-end',
      justifyContent:'center',
    },
    ImagePreviewContainer:{
      width: '50%',
      flexDirection: 'row',
      aspectRatio: 1,
      elevation: 7,
      borderWidth: 1,
      backgroundColor: '#ffffff',
      alignSelf: 'center',
      justifyContent: 'center',
      margin: '3%'
    },
    PlaceholderText: {
      flexShrink: 1,
      color: '#00d1a3',
      fontSize: 18,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    ImagePreview: {
      aspectRatio: 1,
      resizeMode: 'contain'
    },
    modal:{
      backgroundColor:"#ffff",
      height: '25%',
      width: '90%',
      alignSelf: 'center'
    },
    addFailContainer:{
      backgroundColor: "#ffff",
      height: '15%',
      width: '90%',
      marginTop: 'auto',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'red',
      alignSelf: 'center'
    },
    addSuccessContainer:{
      backgroundColor: "#ffff",
      height: '15%',
      width: '90%',
      marginTop: 'auto',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 5,
      borderColor: "#00CC00",
      alignSelf: 'center'
    },
    productDetailsScrollView: {
      height: '75%'
    },
  }
)