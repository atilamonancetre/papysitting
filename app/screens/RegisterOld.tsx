import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { signUpOld } from '../functions/functionsAuthentification';

const RegisterOld = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>

            <Text style={styles.loginText}>Inscrivez-vous en tant que personne âgée</Text>
            <TextInput
                style={styles.loginInput}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.loginInput}
                placeholder="Photo URL"
                value={photoURL}
                onChangeText={setPhotoURL}
            />
            <TextInput
                style={styles.loginInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.loginInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                
                <ActivityIndicator size="large" color="#0000f" />
              ) : (
                <TouchableOpacity
                  onPress={() => signUpOld(email, password, name, photoURL, setLoading)}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginTextButton}>Register</Text>
                </TouchableOpacity>
              )}
            </View>
        </ScrollView>
    );
};

export default RegisterOld;