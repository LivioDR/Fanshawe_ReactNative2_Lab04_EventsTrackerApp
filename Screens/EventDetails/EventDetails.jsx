// React imports
import { View, Text, TouchableHighlight } from "react-native";
import { useState } from "react";

// Navigation imports
import { useRoute } from "@react-navigation/native";

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
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
        backgroundColor: 'yellow',
    },
    detailText: {
        paddingHorizontal: 10,
    },
})

export const EventDetails = ({setter, uid}) => {

    // getting the data for the screen from the route params
    const route = useRoute()
    const event = route.params

    console.log(event)

    // setting local state variables to handle UI changes when the data changes
    const [isOwnEvent, setIsOwnEvent] = useState(uid === event.createdBy ? true : false)
    const [eventData, setEventData] = useState(event)

    // Function to update the event data in Firebase and locally
    const updateEvent = () => {
        // TODO: code function to update the event in Firebase
    }

    // Function to update the favorite status in Firebase and locally
    const toggleFav = () => {
        // Updates the favorite status in the state variable
        setter(prev => {

            console.log(prev)

            let newData = [...prev]
            for(let i=0; i<newData.length; i++){
                if(newData[i].id === event.id){
                    if(newData[i].favorites.includes(uid)){
                        newData[i].favorites = newData[i].favorites.filter(ids => ids != uid)
                    }
                    else{
                        newData[i].favorites = [...newData[i].favorites, uid]
                    }
                }
            }
            return newData
        })
        // Updates the local data received as a parameter
        setEventData(prev => {
            let newData = {...prev}
            if(newData.favorites.includes(uid)){
                newData.favorites = newData.favorites.filter(ids => ids != uid)
            }
            else{
                newData.favorites = [...newData.favorites, uid]
            }
            return newData
        })
        // TODO: code function to toggle fav in Firebase
    }

    if(isOwnEvent){
        // return an editable version

    }

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={styles.title}>{eventData.name}</Text>
            <View style={styles.detailContainer}>
                <Ionicons name="calendar-outline" size={styles.icons.size} />
                <View style={styles.detailTextWrapper}>
                    <Text style={styles.detailText}>{eventData.starts.split("T").join(" @ ")}</Text>
                    <Text style={styles.detailText}>({eventData.relativeTime})</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <Ionicons name="location-outline" size={styles.icons.size}/>
                <View style={styles.detailTextWrapper}>
                    <Text style={styles.detailText}>{eventData.location}</Text>
                </View>
            </View>
            <View>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'teal'}
                    onPress={toggleFav}
                >
                    <Text>{eventData.favorites.includes(uid) ? "Remove from favorites" : "Add to favorites"}</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}