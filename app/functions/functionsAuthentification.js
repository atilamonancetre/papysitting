import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';



export const getUserData = async (uid) => {
    const usersCollection = collection(FIREBASE_DB, 'users');
    const q = query(usersCollection, where('uid', '==', uid));
      
    try {
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.empty) {
            console.error('Aucun document utilisateur trouvé dans la collection "users" pour cet UID.');
            return null;
        }
      
        // Vous pourriez avoir plusieurs documents correspondants à l'UID (ce qui serait inhabituel, car l'UID devrait être unique)
        // Ici, nous prenons le premier document trouvé.
        const userData = querySnapshot.docs[0].data();
      
        // Vous pouvez accéder aux propriétés spécifiques, par exemple, le nom de l'utilisateur
        const userName = userData.name;
      
        return userName;

    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur dans la collection "users":', error);
        return null;
    }
};

export const handleLogout = async (navigation) => {
    const auth = FIREBASE_AUTH
    try {
        await auth.signOut();
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Assurez-vous que 'Dashboard' est le nom de votre écran de tableau de bord
            })
          );
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

export const checkAccountExistence = async (uid) => {
    const db = FIREBASE_DB
    try {
        // Récupérer tous les documents de la collection 'users'
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);

        // Itérer sur les documents pour vérifier si l'UID existe
        for (const docSnapshot of querySnapshot.docs) {
        const userData = docSnapshot.data();
        
        // Vérifier si l'UID correspond
        if (userData.uid === uid) {
            console.log('UID found:', uid);
            return true; // L'UID existe
        }
        }

        // L'UID n'a pas été trouvé
        console.log('UID not found:', uid);
        return false;
    } catch (error) {
        console.error('Error checking account existence:', error);
        return false;
    }
};

export const signInOld = async (navigation, email, password, setLoading) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    setLoading(true);
    try {
        console.log('Before signInWithEmailAndPassword');
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response.user.uid);
        console.log('Full response object:', response.user);

        // Vérifiez si le compte existe
        const accountExists = await checkAccountExistence(response.user.uid);
        console.log('accountExists:', accountExists);

        if (accountExists) {
            // Récupérez tous les documents de la collection 'users'
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);

            // Itérez sur les documents pour trouver le document correspondant à l'UID
            let userDocSnapshot;
            for (const docSnapshot of querySnapshot.docs) {
                const userData = docSnapshot.data();
                if (userData.uid === response.user.uid) {
                    userDocSnapshot = docSnapshot;
                    break;
                }
            }

            if (userDocSnapshot && userDocSnapshot.exists()) {
                const userType = userDocSnapshot.data().type;

                if (userType === 'old') {
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'DashboardOld' }], // Assurez-vous que 'Dashboard' est le nom de votre écran de tableau de bord
                        })
                      );
                } else {
                    // Déconnectez l'utilisateur et affichez un message d'erreur
                    await auth.signOut();
                    alert("You are not old, you cannot log in here!");
                }
            } else {
                alert('User document not found');
            }
        } else {
            alert('Account does not exist');
        }
    } catch (error) {
        alert("Sign in failed: " + error.message);
    } finally {
        setLoading(false);
    }
};

export const signInYoung = async (navigation, email, password, setLoading) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    setLoading(true);
    try {
        console.log('Before signInWithEmailAndPassword');
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response.user.uid);
        console.log('Full response object:', response.user);

        // Vérifiez si le compte existe
        const accountExists = await checkAccountExistence(response.user.uid);
        console.log('accountExists:', accountExists);

        if (accountExists) {
            // Récupérez tous les documents de la collection 'users'
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);

            // Itérez sur les documents pour trouver le document correspondant à l'UID
            let userDocSnapshot;
            for (const docSnapshot of querySnapshot.docs) {
                const userData = docSnapshot.data();
                if (userData.uid === response.user.uid) {
                    userDocSnapshot = docSnapshot;
                    break;
                }
            }

            if (userDocSnapshot && userDocSnapshot.exists()) {
                const userType = userDocSnapshot.data().type;

                if (userType === 'young') {
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'DashboardYoung' }], // Assurez-vous que 'Dashboard' est le nom de votre écran de tableau de bord
                        })
                      );
                } else {
                    // Déconnectez l'utilisateur et affichez un message d'erreur
                    await auth.signOut();
                    alert("You are not old, you cannot log in here!");
                }
            } else {
                alert('User document not found');
            }
        } else {
            alert('Account does not exist');
        }
    } catch (error) {
        alert("Sign in failed: " + error.message);
    } finally {
        setLoading(false);
    }
};


export const signUpOld = async (email, password, name, photoURL, setLoading) => {
    const db = FIREBASE_DB
    const auth = FIREBASE_AUTH
    setLoading(true);
    try {
    // Créer le compte utilisateur avec e-mail et mot de passe
    const response = await createUserWithEmailAndPassword(auth, email, password);

    // Créer un document dans la collection "users" avec des données supplémentaires
    const userDocRef = await addDoc(collection(db, 'users'), {
        uid: response.user.uid,
        type: 'old', // Associer l'utilisateur au type 'old'
        name: name.trim(), // Enregistrez le nom de l'utilisateur après suppression des espaces inutiles
        photoURL: photoURL.trim(), // Enregistrez l'URL de la photo de l'utilisateur après suppression des espaces inutiles
    });

    Alert.alert('Account created successfully!');
    } catch (error) {
    console.error(error);
    Alert.alert('Sign up failed', error.message);
    } finally {
    setLoading(false);
    }
};

export const signUpYoung = async (email, password, name, photoURL, setLoading) => {
    const db = FIREBASE_DB
    const auth = FIREBASE_AUTH
    setLoading(true);
    try {
    // Créer le compte utilisateur avec e-mail et mot de passe
    const response = await createUserWithEmailAndPassword(auth, email, password);

    // Créer un document dans la collection "users" avec des données supplémentaires
    const userDocRef = await addDoc(collection(db, 'users'), {
        uid: response.user.uid,
        type: 'young', // Associer l'utilisateur au type 'old'
        name: name.trim(), // Enregistrez le nom de l'utilisateur après suppression des espaces inutiles
        photoURL: photoURL.trim(), // Enregistrez l'URL de la photo de l'utilisateur après suppression des espaces inutiles
    });

    Alert.alert('Account created successfully!');
    } catch (error) {
    console.error(error);
    Alert.alert('Sign up failed', error.message);
    } finally {
    setLoading(false);
    }
};