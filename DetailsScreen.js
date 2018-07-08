import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View,Button, TextInput,TouchableHighlight,Alert,CheckBox} from 'react-native';
import {createStackNavigator } from 'react-navigation';
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

export default class DetailsScreen extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     text: 'New Item',
     data: [],
   };
 }



  render() {
    return (
      <View style={styles.container}>
      <View style={{marginTop: 20, height: 50, backgroundColor: 'powderblue', flex: 0.05, flexDirection: 'row'} }>
    <Button
onPress={() => {this.setState((prevState, props) => {
 var textBox = prevState.text
  if (textBox === 'New Item') {
    textBox = 'New Item' + String(i)
    i = i+1;
  }
 if (Boolean(textBox)) {
  return {data: [{key: textBox, done : false}].concat(prevState.data) };
}
})}}
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
      <Button style = {item.done ? styles.done : styles.item} onPress={() =>  
        {
          item.done = true;
          this.setState({data: this.state.data.filter(function(item) { 
              return !(item.done)
          })});
      }
        }
        title={item.key}
        color="black"
        />
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
    alignContent: 'flex-start',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  done : {
    alignContent: 'flex-start',
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'red',
    
  }

})