import { StyleSheet } from "react-native";

export default LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'thin',
    },
    formContainer: {
        width: '90%',
        margin: 'auto',
        backgroundColor: '#3d3d3db0',
        borderRadius: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 5,
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        width: '80%',
        marginHorizontal: '10%',
        padding: 10,
        borderRadius: 5,
    },
    alert: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    btnContainer: {
        marginVertical: 30,
        width: '60%',
        margin: 'auto',
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    btnHighlight: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    toggleText: {
        color: 'white',
        marginBottom: 50,
        padding: 12,
    }
})