import { StyleSheet } from "react-native";

export default EventCardStyles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 5,
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
    },
    dateRow: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        color: '#f0f0f0',
    },
    date: {
        fontSize: 14,
        color: 'gold',
    },
    relative: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: 'lightgrey',
    },
})