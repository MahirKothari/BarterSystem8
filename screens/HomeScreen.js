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
        super()
        this.state = {
          echangedItemsList : []
        }
      this.requestRef= null
      }
    render(){
        return(
          <View style={{flex:1}}>
            <View style={{flex:1}}>
              {
                this.state.exchangedItemsList.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Excahnged Items</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.requestedBooksList}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
