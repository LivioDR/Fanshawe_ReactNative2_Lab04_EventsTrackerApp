import { View, Text, StyleSheet } from "react-native";
const moment = require('moment')

const styles = StyleSheet.create({
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
        fontWeight: 800,
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


export const EventCard = ({name, starts}) => {

    const currentDate = new Date()
    const startsDate = new Date(starts)
    const relativeTime = moment().subtract((currentDate.getTime() - startsDate.getTime())/1000, 's').fromNow()

    return(
        <View style={styles.container}>
            <View style={styles.dateRow}>
                <Text style={styles.date}>{starts.split("T").join(" @ ")}</Text>
            </View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.relative}>{relativeTime}</Text>
        </View>
    )
}