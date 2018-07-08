import React, { Component } from 'react';
import {  AsyncStorage,FlatList, StyleSheet, Text, View,Button, TextInput,TouchableHighlight,Alert,} from 'react-native';
import { createStackNavigator } from 'react-navigation';
var i = 1;

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {35}
      />
    );
  }
}

export default class ListsScreen extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     text: 'New List',
     data: [],
   };
   this._retrieveData()
 }

 _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('ListNames');
    if (value !== null) {
    
      this.setState({ data: value.split(",") })
    }
   } catch (error) {
     Alert.alert('didnt retrieve')
   }
}

_storeData = async (textBox) => {
  try { 
   var dataString = [textBox].concat(this.state.data);
    await AsyncStorage.setItem('ListNames', dataString.toString());
  } catch (error) {
   Alert.alert('Error saving')
  }
}

  render() {
  
    return (
      <View style={styles.container}>
      <View style={{marginTop: 20, height: 50, backgroundColor: 'powderblue', flex: 0.05, flexDirection: 'row'} }>
    <Button
onPress={() => {this.setState((prevState, props) => {
 var textBox = prevState.text
  if (textBox === 'New List') {
    textBox = 'New List ' + String(i)
    i = i+1;
  }
 if (Boolean(textBox)) {
  this._storeData(textBox)
  return {data: [textBox].concat(prevState.data) };
}
}); 
 } }
title="+"
color="black"
/>
      <UselessTextInput
        multiline = {true}
        numberOfLines = {1}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      </View>

    <FlatList
      data= {this.state.data}
      renderItem={({item}) =>  
     
     <TouchableHighlight
     onPress={() => this.props.navigation.navigate('Details')}
     underlayColor='black'
   >
     <View>
       <Text style={styles.item}>{item }</Text> 
     </View>
   </TouchableHighlight>
}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>

    );

  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

})