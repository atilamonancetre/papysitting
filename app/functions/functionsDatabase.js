import { collection, query, where, getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



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

export const postOld = async (title, description, availability, uid, setLoading, navigation) => {
  setLoading(true);
  // post the demand (title, description, and availability) to the database
  try {
    const db = FIREBASE_DB;
    const annoncesCollection = collection(db, 'annoncesVieux');
    // Enregistrez le titre, la description et les disponibilités dans la collection 'annonce'
    await addDoc(annoncesCollection, {
      prenom: uid,
      titre: title,
      description: description,
      disponibilites: availability, // Ajoutez les disponibilités à l'objet enregistré
    });

    // Créer une alerte pour dire que le post a bien été effectué
    Alert.alert(
      "Vous venez de poster une annonce !",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    console.log('Post successful!');
  } catch (error) {
    console.log(error);
    alert("Post failed: " + error.message);
  } finally {
    setLoading(false);
    // Utilisez la navigation pour rediriger l'utilisateur après le post
    navigation.navigate('Dashboard'); // Assurez-vous que 'Dashboard' est le nom de votre écran de tableau de bord
  }
};

export const postYoung = async (title, description, availability, uid, setLoading, navigation) => {
    setLoading(true);
    // post the demand (title, description, and availability) to the database
    try {
      const db = FIREBASE_DB;
      console.log(db)
      const annoncesCollection = collection(db, 'annoncesJeunes');
      console.log(annoncesCollection)
      // Enregistrez le titre, la description et les disponibilités dans la collection 'annonce'
      await addDoc(annoncesCollection, {
        prenom: uid,
        titre: title,
        description: description,
        disponibilites: availability,
      });
      
      //creer une alerte pour dire que il y a bien eu un post
      Alert.alert(
          "Vous venez de poster une annonce!"
          [
          { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
      );
      console.log('Post successful!');
    } catch (error) {
      console.log(error);
      alert("Post failed: " + error.message);
    } finally {
      setLoading(false);
    }
};

export const handleDeleteAnnonceJeunes = async (annonceId, setAnnonces) => {
    try {
        const annoncesCollection = collection(FIREBASE_DB, 'annoncesJeunes');
        await deleteDoc(doc(annoncesCollection, annonceId));
        // Mettez à jour l'état des annonces après la suppression
        setAnnonces((prevAnnonces) => prevAnnonces.filter((annonce) => annonce.id !== annonceId));
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
    }
};

export const handleDeleteAnnonceVieux = async (annonceId, setAnnonces) => {
    try {
        const annoncesCollection = collection(FIREBASE_DB, 'annoncesVieux');
        await deleteDoc(doc(annoncesCollection, annonceId));
        // Mettez à jour l'état des annonces après la suppression
        setAnnonces((prevAnnonces) => prevAnnonces.filter((annonce) => annonce.id !== annonceId));
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
    }
};

export const updateAnnonceJeunes = async (annonceId, updatedDetails) => {
    const annoncesCollection = doc(FIREBASE_DB, 'annoncesJeunes', annonceId);

    try {
        await updateDoc(annoncesCollection, updatedDetails);
        console.log('Annonce mise à jour avec succès.');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
        throw error;
    }
};

export const getAnnonceJeunesDetails = async (annonceId) => {
    const annoncesCollection = doc(FIREBASE_DB, 'annoncesJeunes', annonceId);

    try {
        const annonceSnapshot = await getDoc(annoncesCollection);

        if (annonceSnapshot.exists()) {
            return { id: annonceSnapshot.id, ...annonceSnapshot.data() };
        } else {
            throw new Error('Annonce non trouvée.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'annonce :', error);
        throw error;
    }
};

export const updateAnnonceVieux = async (annonceId, updatedDetails) => {
    const annoncesCollection = doc(FIREBASE_DB, 'annoncesVieux', annonceId);

    try {
        await updateDoc(annoncesCollection, updatedDetails);
        console.log('Annonce mise à jour avec succès.');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
        throw error;
    }
};

export const getAnnonceVieuxDetails = async (annonceId) => {
    const annoncesCollection = doc(FIREBASE_DB, 'annoncesVieux', annonceId);

    try {
        const annonceSnapshot = await getDoc(annoncesCollection);

        if (annonceSnapshot.exists()) {
            return { id: annonceSnapshot.id, ...annonceSnapshot.data() };
        } else {
            throw new Error('Annonce non trouvée.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'annonce :', error);
        throw error;
    }
};

