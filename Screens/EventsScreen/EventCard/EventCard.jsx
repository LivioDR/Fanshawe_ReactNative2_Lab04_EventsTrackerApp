import { View, Text } from "react-native";
import styles from "./EventCardStyles";
const moment = require('moment')


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