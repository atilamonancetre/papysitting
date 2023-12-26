import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeetingOld from './app/screens/MeetingOld';
import DashboardOld from './app/screens/DashboardOld';
import DashboardYoung from './app/screens/DashboardYoung';
import RegisterOld from "./app/screens/RegisterOld"
import Connexion from "./app/screens/Connexion"
import MeetingYoung from "./app/screens/MeetingYoung"
import ListYoung from './app/screens/ListYoung';
import ListOld from './app/screens/ListOld';
import ListSelfYoung from './app/screens/ListSelfYoung';
import ListSelfOld from './app/screens/ListSelfOld';
import EditAnnonceYoung from './app/screens/EditAnnonceYoung';
import EditAnnonceOld from './app/screens/EditAnnonceOld';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardOld" component={DashboardOld} />
        <Stack.Screen name="DashboardYoung" component={DashboardYoung} />
        <Stack.Screen name="MeetingOld" component={MeetingOld} />
        <Stack.Screen name="MeetingYoung" component={MeetingYoung} />
        <Stack.Screen name="ListOld" component={ListOld} />
        <Stack.Screen name="ListYoung" component={ListYoung} />
        <Stack.Screen name="ListSelfYoung" component={ListSelfYoung} />
        <Stack.Screen name="ListSelfOld" component={ListSelfOld} />
        <Stack.Screen name="RegisterOld" component={RegisterOld} />
        <Stack.Screen name="EditAnnonceYoung" component={EditAnnonceYoung} />
        <Stack.Screen name="EditAnnonceOld" component={EditAnnonceOld} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
