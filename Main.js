/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import ListsScreen from "./Home";
import DetailsScreen from "./DetailsScreen";
import {createStackNavigator} from 'react-navigation';
import {  AsyncStorage,Alert} from 'react-native';


const RootStack = createStackNavigator({
  Home: ListsScreen,
  Details: DetailsScreen,
},
{
  initialRouteName: 'Home',
}
);

export default class App extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }


   
  render() {
   
    return (
       <RootStack />
    );
  }
}

