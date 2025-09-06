import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppPro from './AppPro';
import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';
const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: AppPro,
      options: {headerShown: false},
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

AppRegistry.registerComponent(appName, () => Navigation);