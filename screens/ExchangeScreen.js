import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';


import db from '../Config';
import firebase from 'firebase';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state ={
          userName : firebase.auth().currentUser.email,
          itemName : "",
          description : "",
          requestedItemName:"",
          exchangeId:"",
          itemStatus:"",
          docId: "",
          itemValue:"",
          currencyCode:""
        }
      }

      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }

      addItem= async(itemName, description)=>{

        var userName = this.state.userName
        var exchangeId = this.createUniqueId()
        console.log("im called",exchangeId);
        db.collection("exchange_requests").add({
          "username"    : userName,
          "item_name"   : itemName,
          "description" : description,
          "exchangeId"  : exchangeId,
          "item_status" : "requested",
          "item_value"  : this.state.itemValue,
            "date"       : firebase.firestore.FieldValue.serverTimestamp()
    
         })
    
         await this.getExchangeRequest()
         db.collection('users').where("username","==",userName).get()
       .then()
       .then((snapshot)=>{
         snapshot.forEach((doc)=>{
           db.collection('users').doc(doc.id).update({
         IsExchangeRequestActive: true
         })
       })
     })
    
         this.setState({
           itemName : '',
           description :'',
           itemValue : ""
         })
    
    
    
         // NOTE: Comment below return statement when you test the app in ios
         // ToastAndroid.showWithGravityAndOffset('Item ready to exchange',
         //    ToastAndroid.SHORT,
         //  );
         // return this.props.navigation.navigate('HomeScreen')
    
         // NOTE:  Comment the below return statement when you test the app in android
         return Alert.alert(
              'Item ready to exchange',
              '',
              [
                {text: 'OK', onPress: () => {
    
                  this.props.navigation.navigate('HomeScreen')
                }}
              ]
          );
      }

      render(){
        return(
            <View style={{flex:1}}>
              <MyHeader title="Exchange Book"/>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                  <TextInput
                    style ={styles.formTextInput}
                    placeholder={"enter item name"}
                    onChangeText={(text)=>{
                        this.setState({
                            itemName:text
                        })
                    }}
                    value={this.state.itemName}
                  />
                  <TextInput
                    style ={[styles.formTextInput,{height:300}]}
                    multiline
                    numberOfLines ={8}
                    placeholder={"Why do you need the item"}
                    onChangeText ={(text)=>{
                        this.setState({
                            itemDescription:text
                        })
                    }}
                    value ={this.state.reasonToExchange}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{this.addItem(this.state.itemName,this.state.reasonToExchange)}}
                    >
                    <Text>Exchange</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      keyBoardStyle : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
      }
    )
    