//TODO: unsure sa design sa add product, and how to add new data 
// Implement screen behavior if blank
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
        Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewProductDetails from '../modals/viewProductDetails'
import {Fontisto} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import json2formdata from 'json2formdata';

import productApi from '../api/Products';
import {getProductImg, getSelectProduct} from '../redux/productScreen/selectors';
import {setDescription, setInStock, setName, setPrice, setProductImg} from '../redux/productScreen/actions' 
import usersApi from '../api/Users';

import RejectModal from '../modals/RejectModal';
import WaitingModal from '../modals/WaitingModal';
import VerifiedModal from '../modals/VerifiedModal'; 

const actionDispatch = (dispatch) => ({
  setName: (name) => dispatch(setName(name)),
  setPrice: (price) => dispatch(setPrice(price)),
  setDescription: (description) => dispatch(setDescription(description)),
  setInStock: (in_stock) => dispatch(setInStock(in_stock)),
  setProductImg: (product_img) => dispatch(setProductImg(product_img))
})

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const productList = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const {setDescription, setName, setPrice, setInStock, setProductImg} = actionDispatch(useDispatch());
  const newProduct = useSelector(getSelectProduct);
  const {name, description, price, in_stock, product_img} = useSelector(getSelectProduct);
  const [products, setProducts] = useState(null);
  const [itemData, setItemData] = useState(null);
  // why not place it in addProduct?
  useEffect(() => {
    (async () => {
      const response = await productApi.get('products');
      setProducts(response.data);
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [modal2Visible]);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  
    console.log(result); //Details of the uploaded image
  
    if (result.cancelled)
      return null;
  
    setProductImg(result.uri); //Do not remove this as this is to display the image
  };
  

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === name ? "transparent" : "#ffffff";
    const color = item.name === name ? 'white' : 'black';
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
          <FlatList data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.description}
          />
        </SafeAreaView>
        <TouchableOpacity style = {styles.Button} onPress = {() =>{
          setModal2Visible(!modal2Visible);
        }}>
         <Text style = {styles.ButtonText}>ADD PRODUCT</Text>
        </TouchableOpacity>
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
              <ViewProductDetails itemData={itemData}/>
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
        <View style={styles.modalAddContainer}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity style={{margin:15 , alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setSuccessVisible(!successVisible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <Text style={{alignSelf:'center', fontSize:28, color:"#00B300", letterSpacing: 0.5, fontWeight:'bold'}}> SUCCESS! </Text>
              </View>
              <View style={{alignItems:'center'}}>
                <Image source={require('../assets/success.jpg')}
                style={{height:85, width:100, marginVertical:5}}>
                </Image>
              </View>
              <Text style={{marginVertical:1, fontSize:20, textAlign:'center'}}>
                Product has been successfully added
              </Text>
          </View>
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
        <View style={styles.modalAddContainer}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity style={{margin:15 , alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setFailVisible(!failVisible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <Text style={{alignSelf:'center', fontSize:25, color:"#E60000", letterSpacing: 3, fontWeight:'bold'}}> FAIL! </Text>
              </View>
              <View style={{alignItems:'center'}}>
                <Image source={require('../assets/warning.png')}
                style={{height:100, width:90, marginVertical:2}}>
                </Image>
              </View>
              <Text style={{marginVertical:1, fontSize:20, textAlign:'center'}}>
                Product has not been added
              </Text> 
              
          </View>
        </View>
      </Modal>

      <Modal 
            animationType = "slide"
            visible={modal2Visible}
            transparent={true}
            onRequestClose = {() => {
                    setModal2Visible(false); 
            }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'relative'}} onPress = {() => setModal2Visible(!modal2Visible)}>
                      <Fontisto name="close" size={30}/>
              </TouchableOpacity>
              <View style = {styles.addProductDetailsField}>
                <Text style = {styles.addProductTitleText}>
                  ADD PRODUCT
                </Text>
                <TextInput
                placeholder = "Name"
                placeholderTextColor = '#ffffff'
                underlineColorAndroid = "transparent"
                style = {styles.inputField}
                onChangeText = {(inputTxt) => {setName(inputTxt)}}
                />
                <TextInput
                placeholder = "Price"
                placeholderTextColor = '#ffffff'
                underlineColorAndroid = "transparent"
                style = {styles.inputField}
                onChangeText = {(price) => {setPrice(price)}}
                />
                <TextInput
                placeholder = "Description"
                placeholderTextColor = '#ffffff'
                underlineColorAndroid = "transparent"
                style = {styles.inputField}
                onChangeText = {(description) => {setDescription(description)}}
                />
                <View style = {styles.ImagePreviewContainer}>
                  {product_img && <Image source={{ uri: product_img}} style={styles.ImagePreview} />}
                  <Text style = {styles.PlaceholderText}>
                    ID Photo
                  </Text> 
                </View>
                <TouchableOpacity style = {styles.addProductButton} onPress = {pickImage}>
                  <Text style = {styles.addProductButtonText}>UPLOAD ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.addProductButton}
                                  onPress = {async () =>{
                                    console.log("NEWPRODUCT DATA", newProduct);
                                    const formdata = json2formdata(JSON.stringify(newProduct));
                                    console.log(formdata);
                                    const response = await productApi.post('addproduct', formdata, {headers : {
                                      'Content-Type': 'multipart/form-data',
                                    }});
                                    console.log(response);
                                    setModal2Visible(!modal2Visible);
                                    setSuccessVisible(!successVisible);
                                    //setFailVisible(!failVisible);
                                  }}>
                  <Text style = {styles.addProductButtonText}>
                    ADD
                  </Text>
                </TouchableOpacity>
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
    },
    ListContainer:{
      width: '100%',
      height: '83%',
      borderBottomWidth: 4,
      borderColor: '#ffffff',
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
      width: '90%',
      margin: '3%',
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
    Button: {
      borderWidth: 3,
      borderColor: '#ffffff',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '6%',
      padding: '2%'
    },
    ButtonText: {
      color: '#ffffff',
      fontSize: 20,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
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
     // backgroundColor: "transparent"
     //mao ni makacause sa di ma touch ang fontisto nga button
    },
    inputField: {
      width: '100%',
      padding: '1%',
      borderRadius: 15,
      borderWidth: 0.75,
      borderColor: 'black',
      backgroundColor: '#dcdcdc',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
      margin: "3.5%",
      alignSelf:'center'
    },
    addProductTitleText: {
      fontSize: 25,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      letterSpacing: 0.3,
      alignSelf: 'center',
      marginBottom: '7%',
      color: '#2a2a2a',
    },
    addProductButton: {
      borderWidth: 3,
      borderColor: '#00d1a3',
      backgroundColor:  '#00d1a3',
      borderRadius: 23,
      width: '70%',
      alignSelf:'center',
      alignItems:'center',
      marginTop: '7%',
      padding: '2%',
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
    modalAddContainer:{
      height: '25%',
      width: '85%',
      marginTop: 'auto',
      alignItems:'stretch',
      borderRadius: 20,
      borderWidth: 5,
      borderColor: '#00CCAA',
      alignSelf: 'center'
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
  }
)