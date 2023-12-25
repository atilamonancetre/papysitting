import { View, Text, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
import styles from "../styles/styles";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const ListYoung = ({ navigation }: RouterProps) => {
    const [annonces, setAnnonces] = useState([]);
    const currentUser = FIREBASE_AUTH.currentUser;
    const uid = currentUser ? currentUser.uid : null;

    useEffect(() => {
        if (!uid) {
            // L'utilisateur n'est pas connecté
            return;
        }

        const fetchAnnonces = async () => {
            const annoncesCollection = collection(FIREBASE_DB, 'annoncesJeunes');
            const annoncesQuery = query(annoncesCollection, where('uid', '==', uid));

            const unsubscribe = onSnapshot(annoncesQuery, (snapshot) => {
                const annoncesData = [];
                snapshot.forEach((doc) => {
                    annoncesData.push({ id: doc.id, ...doc.data() });
                });

                setAnnonces(annoncesData);
            });

            // Retourne la fonction de désinscription pour arrêter l'écoute lorsque le composant est démonté
            return () => unsubscribe();
        };

        fetchAnnonces();
    }, [uid]);

    return (
        <View style={styles.disponibilitesContainer}>
            <Text style={styles.loginText}>Liste des annonces</Text>
            <FlatList
                data={annonces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemTitle}>{item.titre}</Text>
                        <Text style={styles.listItemDescription}>{item.description}</Text>
                        <View style={styles.disponibilitesContainer}>
                            <Text style={styles.DispoText}>Disponibilités</Text>
                            {Object.entries(item.disponibilites).map(([jour, dispo], index) => (
                                <View key={index}>
                                    <Text style={styles.disponibilitesDay}>{jour}</Text>
                                    <Text style={styles.disponibilitesTime}>
                                        Matin: {dispo.morning ? 'Oui' : 'Non'}
                                    </Text>
                                    <Text style={styles.disponibilitesTime}>
                                        Midi: {dispo.noon ? 'Oui' : 'Non'}
                                    </Text>
                                    <Text style={styles.disponibilitesTime}>
                                        Soir: {dispo.evening ? 'Oui' : 'Non'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                    </View>
                )}
            />
        </View>
    );
};

export default ListYoung;
