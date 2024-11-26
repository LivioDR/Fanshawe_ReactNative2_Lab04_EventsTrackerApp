import { StyleSheet } from "react-native";

export default EventDetailsStyles = StyleSheet.create({
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
        marginTop: 50,
        backgroundColor: 'gold',
        padding: 20,
        borderRadius: 10,
    },
    btnText: {
        color: 'black',
        fontSize: 18,
    }
})