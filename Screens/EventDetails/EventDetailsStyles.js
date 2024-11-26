import { StyleSheet } from "react-native";

export default EventDetailsStyles = StyleSheet.create({
    title: {
        fontSize: 32,
        flexWrap: 'wrap',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
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
    },
    btn: {
        marginTop: 50,
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
    }
})