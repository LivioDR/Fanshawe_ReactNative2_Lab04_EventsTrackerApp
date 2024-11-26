// React imports
import { View, Text, TouchableHighlight } from "react-native";
import { useState } from "react";

// Navigation imports
import { useRoute } from "@react-navigation/native";

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./EventDetailsStyles";


export const EventDetails = ({setter, uid}) => {

    // getting the data for the screen from the route params
    const route = useRoute()
    const event = route.params

    // setting local state variables to handle UI changes when the data changes
    const [isOwnEvent, setIsOwnEvent] = useState(uid === event.createdBy ? true : false)
    const [eventData, setEventData] = useState(event)
    const [isProcessing, setIsProcessing] = useState(false)

    // Function to update the event data in Firebase and locally
    const updateEvent = () => {
        // TODO: code function to update the event in Firebase
    }

    // Function to update the favorite status in Firebase and locally
    const toggleFav = () => {
        setIsProcessing(true)
        // Updates the favorite status in the state variable
        setter(prev => {
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
        setIsProcessing(false)
    }

    if(isOwnEvent){
        // return an editable version

    }

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
        }}>
            <Text style={styles.title}>{eventData.name}</Text>
            <View style={styles.detailContainer}>
                <Ionicons name="calendar-outline" size={styles.icons.size} color={'purple'} />
                <View style={styles.detailTextWrapper}>
                    <Text style={styles.detailText}>{eventData.starts.split("T").join(" @ ")}</Text>
                    <Text style={styles.detailText}>({eventData.relativeTime})</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <Ionicons name="location-outline" size={styles.icons.size} color={'red'} />
                <View style={styles.detailTextWrapper}>
                    <Text style={styles.detailText}>{eventData.location}</Text>
                </View>
            </View>
            <View style={styles.btn}>
                {
                    isOwnEvent &&
                <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={'yellow'}
                onPress={()=>{console.log("Edit pressed")}}
                disabled={isProcessing}
                >
                <Text style={styles.btnText}>Edit event</Text>
                </TouchableHighlight>
                }
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'yellow'}
                    onPress={toggleFav}
                    disabled={isProcessing}
                >
                    <Text style={styles.btnText}>{eventData.favorites.includes(uid) ? "Remove from favorites" : "Add to favorites"}</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}