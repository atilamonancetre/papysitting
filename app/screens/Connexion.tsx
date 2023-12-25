import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import LoginYoung from './LoginYoung';
import LoginOld from './LoginOld'
import RegisterOld from './RegisterOld';
import RegisterYoung from './RegisterYoung';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../styles/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardOld from './DashboardOld';
import DashboardYoung from './DashboardYoung';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Login = () => (
    <Tab.Navigator>
      <Tab.Screen name="LoginYoung" component={LoginYoung} options={{ headerShown: false }} />
      <Tab.Screen name="LoginOld" component={LoginOld} options={{ headerShown: false }} />
    </Tab.Navigator>
  );

const Connexion = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="RegisterOld" component={RegisterOld} />
    <Stack.Screen name="RegisterYoung" component={RegisterYoung} />
    <Stack.Screen name="DashboardOld" component={DashboardOld} />
    <Stack.Screen name="DashboardYoung" component={DashboardYoung} />

  </Stack.Navigator>
); 

export default Connexion; 
