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
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setFailVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

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
              <Text style={{alignSelf:'center', fontSize:28, fontWeight:'bold'}}> Success! </Text>
              </View>
              {/*<View style={{alignItems:'center'}}>
                <Image source={require('../assets/success.jpg')}
                style={{height:85, width:100, marginVertical:5}}>
                </Image>
              </View>*/}
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
              <Text style={{alignSelf:'center', fontSize:25, fontWeight:'bold'}}> Fail! </Text>
              </View>
              {/*<View style={{alignItems:'center'}}>
                <Image source={require('../assets/warning.png')}
                style={{height:100, width:90, marginVertical:2}}>
                </Image>
              </View>*/}
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
              <TouchableOpacity style={{margin:10, alignSelf:'flex-end', position: 'absolute'}} onPress = {() => setModal2Visible(!modal2Visible)}>
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
                />
                <TextInput
                placeholder = "Price"
                placeholderTextColor = '#ffffff'
                underlineColorAndroid = "transparent"
                style = {styles.inputField}
                />
                <TextInput
                placeholder = "Description"
                placeholderTextColor = '#ffffff'
                underlineColorAndroid = "transparent"
                style = {styles.inputField}
                />
                <TouchableOpacity style = {styles.addProductButton}
                onPress = {() =>{
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
      marginTop: '10%',
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
      borderColor: '#00CCAA'
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
    }
  }
)