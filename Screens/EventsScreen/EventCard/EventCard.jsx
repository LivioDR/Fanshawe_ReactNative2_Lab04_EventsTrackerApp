import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./EventCardStyles";
const moment = require('moment')


export const EventCard = ({name, starts, uid, id, createdBy, favorites, location, interactive = false}) => {

    const [isFav, setIsFav] = useState(favorites.includes(uid))

    const currentDate = new Date()
    const startsDate = new Date(starts)
    const relativeTime = moment().subtract((currentDate.getTime() - startsDate.getTime())/1000, 's').fromNow()
    
    // Setting up the navigation to the detail page
    const navigation = useNavigation()
    const onTouch = () => {
        navigation.navigate("Event details", {
            name: name,
            starts: starts,
            createdBy: createdBy,
            favorites: favorites,
            id: id,
            location: location,
            relativeTime: relativeTime,
        })
    }

    // Changes the icon on the card every time that the favorites parameter is changed
    useEffect(()=>{
        setIsFav(favorites.includes(uid))
    },[favorites])

    if(interactive){
        return(
            <Pressable
                onPress={onTouch}
            >
                <View style={styles.container}>
                    <View style={styles.dateRow}>
                        <Text style={styles.date}>{starts.split("T").join(" @ ")}</Text>
                        {isFav ? <Ionicons name="star" color={'gold'} size={16} /> : <></>}
                    </View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.relative}>{relativeTime}</Text>
                </View>            
            </Pressable>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.dateRow}>
                <Text style={styles.date}>{starts.split("T").join(" @ ")}</Text>
                {isFav ? <Ionicons name="star" color={'gold'} size={16} /> : <></>}
            </View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.relative}>{relativeTime}</Text>
        </View>
    )
}