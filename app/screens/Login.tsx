import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react"
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

import DashboardOld from "./DashboardOld";
import DashboardYoung from "./DashboardYoung";
import styles from "../styles/styles"

  
const Login = () => {
    const Stack = createNativeStackNavigator();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState<'young' | 'old'>('young');
    const auth = FIREBASE_AUTH
    const navigation = useNavigation<NavigationProp<Record<string, object>>>();


    const db = FIREBASE_DB;
    
    // Fonction pour vérifier si le compte existe
    const checkAccountExistence = async (uid) => {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);
        return userDocSnapshot.exists();
};
  
    const signUp = async () => {
        setLoading(true);
        try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
    
        // Vérifiez si le compte existe
        const accountExists = await checkAccountExistence(response.user.uid);
    
        if (accountExists) {
            alert("Account already exists");
        } else {
            // Créez un document dans la collection "users"
            const userDocRef = await addDoc(collection(db, 'users'), {
            uid: response.user.uid,
            type: userType,
            });
    
            alert("Account created successfully!");
        }
        } catch (error) {
        console.log(error);
        alert("Sign up failed: " + error.message);
        } finally {
        setLoading(false);
        }
    };
  
    const signIn = async () => {
        setLoading(true);
        try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    
        // Vérifiez si le compte existe
        const accountExists = await checkAccountExistence(response.user.uid);
    
        if (accountExists) {
            // Récupérez les informations du document "users" correspondant à l'UID
            const userDocRef = doc(db, 'users', response.user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
    
            if (userDocSnapshot.exists()) {
            const userType = userDocSnapshot.data().type;
    
            // Vérifiez le type de l'utilisateur
            if (userType === 'young') {
                navigation.navigate('DashboardYoung');
            } else if (userType === 'old') {
                // Vérifiez la page d'accueil préférée des "vieux"
                const preferredHomepage = userDocSnapshot.data().preferredHomepage;
    
                if (preferredHomepage === 'DashboardOld') {
                navigation.navigate('DashboardOld');
                } else {
                // Redirigez vers la page appropriée ou affichez un message
                alert('You are an old user, switch to the correct page!');
                }
            } else {
                // Gestion du cas où le type n'est pas défini ou inconnu
                alert('Unknown user type');
            }
            } else {
            alert('User document not found');
            }
        } else {
            alert('Account does not exist');
        }
        } catch (error) {
        console.log(error);
        alert("Sign in failed: " + error.message);
        } finally {
        setLoading(false);
        }
    };  

    return (
        <View style={styles.loginContainer}>
          <KeyboardAvoidingView behavior='padding'>
            <Text style={styles.loginText}>{userType}</Text>
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
    
            {loading ? (
              <ActivityIndicator size="large" color="#0000f" />
            ) : (
              <View style={styles.loginButtonContainer}>
                <Button
                  title="Login"
                  onPress={signIn}
                />
            
                <Button
                  title="Sign Up"
                  onPress={signUp}
                />
                <Button
                  title={userType === 'young' ? 'Switch to old' : 'Switch to young'}
                  onPress={() => setUserType(userType === 'young' ? 'old' : 'young')}
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
    );
    };
export default Login;
