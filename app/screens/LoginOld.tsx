// Importez les modules nécessaires
import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styles from "../styles/styles";
import { signInOld } from "../functions/functionsAuthentification";
import { CheckBox } from "react-native-elements";


const Stack = createNativeStackNavigator();


const LoginOld = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  

  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style = {styles.loginText}>Bienvenue sur Papysitting!</Text>
          <Text style = {styles.loginText}>espace vieux</Text>
          <Text style = {styles.loginSubtext}>Connectez-vous à votre compte et commencez l'aventure</Text>
          <TextInput
            value={email}
            style={styles.loginInput}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.loginInput}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={() => setRememberMe(!rememberMe)}
            />
            <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000f" />
          ) : (
            <TouchableOpacity
              onPress={() => signInOld(navigation, email, password, setLoading)}
              style={styles.loginButton}
            >
              <Text style={styles.loginTextButton}>Login</Text>
            </TouchableOpacity>
          )}



          <View style={styles.rowContainer}>
            <Text style={styles.TextInput}>Première fois sur Papysitting ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterOld')}>
              <Text style={styles.textLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>



        </View>
      </ScrollView>
  );
};

export default LoginOld;
