import { StyleSheet } from 'react-native';

const neu1 = '#ecf0f3';
const neu2 = '#d1d9e6';
const white = '#f9f9f9';
const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';

const styles = StyleSheet.create({
    dayContainer: {
        marginVertical: 10,
        alignItems: 'center',
      },
      availabilityContainer: {
        marginTop: 10,
        backgroundColor: neu2,
        padding: 10,
        borderRadius: 10,
        width: '90%',
      },
    dayLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: black,
      },
    container: {
        flex: 1,
        backgroundColor: neu1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disponibilitesContainer: {
        marginTop: 20,
        flex: '90%',
        marginLeft: 10,
        marginRight: 10,
      },
    disponibilitesDay: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
    disponibilitesTime: {
        marginLeft: 10,
      },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // ou 'stretch'
    },

    scrollContainer: {
        flex: 1,
        backgroundColor: neu1,
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        width: '50%',
        fontSize: 12,
        marginBottom: 1,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginButton: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom : 10,
        backgroundColor: black,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,        
    },

    flatListItem: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    listItem: {
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItemDescription: {
        fontSize: 16,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0', // Couleur de fond agréable
    },
    loginText: {
        width: '90%',
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    DispoText: {
        width: '90%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
    },
    loginTextButton: {
        width: '90%',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: white,
    },
    loginSubtext: {
        width: '90%',
        fontSize: 12,
        marginBottom: 10,
    },
    loginSubsubtext: {
        width: '90%',
        fontSize: 12,
        marginBottom: 1,
    },
    loginInput: {
        backgroundColor: white,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        marginTop: 5,
        fontSize: 16,
    },
    loginButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    loginButtonText: {
        color: white,
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', // pour aligner les éléments verticalement au centre
        marginTop: 0, // ou tout autre espacement nécessaire
      },
    textLink: {
        color: 'blue', // ou toute autre couleur que vous préférez
        fontSize: 12,
        marginBottom: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',

      },
      checkboxLabel: {
        marginLeft: 2,
        fontSize: 14,
        marginRight: 10,
        width: '37%'
      },
      forgotPassword: {
        color: "blue", // Couleur de votre choix
        marginTop: 0,
        fontSize: 14,
      },

      tableText: {
        textAlign: 'center',
        padding: 10,
      },
      
});

export default styles;
