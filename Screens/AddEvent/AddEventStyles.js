import { StyleSheet } from "react-native";


export default AddEventStyles = StyleSheet.create({
    title: {
        width: '80%',
        fontSize: 24,
        flexWrap: 'wrap',
        textAlign: 'flex-start',
        color: 'white',
    },
    titleInput: {
        width: '80%',
        backgroundColor: 'lightgrey',
        marginBottom: 20,
        fontSize: 18,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    dateLabel: {
        color: 'white',
        textAlign: 'left',
        width: '80%',
        fontSize: 24,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10,
    },
    icons: {
        size: 32,
    },
    detailTextWrapper: {
        alignItems: 'flex-start',
        padding: 10,
        width: '70%',
    },
    detailText: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 10,
        color: 'black',
        marginBottom: 10,
        width: '100%',
        fontSize: 18,
        paddingVertical: 5,
    },
    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50,
    },
    btnText: {
        borderRadius: 10,
        backgroundColor: 'gold',
        color: 'black',
        fontSize: 18,
        padding: 20,
        marginVertical: 0,
    },
    error: {
        color: 'red',
        fontSize: 16,
        flexWrap: 'wrap',
        width: '80%',
        textAlign: 'center',
    },
})