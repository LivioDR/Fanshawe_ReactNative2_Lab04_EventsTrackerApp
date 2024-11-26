import { StyleSheet } from "react-native";


export default AddEventStyles = StyleSheet.create({
    title: {
        fontSize: 32,
        flexWrap: 'wrap',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
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
        paddingHorizontal: 10,
        color: 'white',
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
    }
})