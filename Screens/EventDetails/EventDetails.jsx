// React imports
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Navigation imports
import { useRoute } from "@react-navigation/native";

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./EventDetailsStyles";

// Database imports
import { updateEventInDb, deleteEventById } from '../../services/database.js' 


export const EventDetails = ({setter, uid}) => {

    // getting the data for the screen from the route params
    const route = useRoute()
    const event = route.params

    // getting the navigate object to navigate back when deleting the event
    const navigation = useNavigation()

    // setting local state variables to handle UI changes when the data changes
    const [isOwnEvent, setIsOwnEvent] = useState(uid === event.createdBy ? true : false)
    const [eventData, setEventData] = useState(event)
    const [editMode, setEditMode] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)


    // Function to update the event data in Firebase and locally
    const updateEvent = async() => {
        // update the event in Firebase (removing relativeTime key before sending it)
        const dataForDb = {...eventData}
        delete dataForDb.relativeTime
        await updateEventInDb(dataForDb)
        
        // update event in state variable
        setter(prev => {
            let newData = [...prev]
            for(let i=0; i<newData.length; i++){
                if(newData[i].id === eventData.id){
                    newData[i] = {...eventData}
                    delete newData[i].relativeTime
                    if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(newData[i].starts)){
                        newData[i].starts = event.starts
                    }
                }
            }
            return newData
        })

        setEditMode(false)
    }

    // Function to remove the event in Firebase and locally
    const removeEvent = async() => {
        setIsProcessing(true)

        // removes the event locally
        setter(prev => {
            let newData = [...prev]
            newData = newData.filter(event => event.id != eventData.id)
            return newData
        })

        // remove event from Firebase with ID
        await deleteEventById(eventData.id)


        // enabling again the buttons
        setIsProcessing(false)

        // navigate back to the list after processing the data deletion
        navigation.goBack()

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

    // EDIT MODE FOR THE EVENT
    if(editMode){
        return(
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>
                <TextInput
                style={styles.title}
                value={eventData.name}
                onChange={(e) => {
                    setEventData(prev => {
                        let newData = {...prev}
                        newData.name = e.nativeEvent.text
                        return newData
                    })
                }}
                />
                <View style={styles.detailContainer}>
                    <Ionicons name="calendar-outline" size={styles.icons.size} color={'purple'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={eventData.starts}
                        onChange={(e) => {
                            setEventData(prev => {
                                let newData = {...prev}
                                newData.starts = e.nativeEvent.text
                                return newData
                            })
                        }}
                        />
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <Ionicons name="location-outline" size={styles.icons.size} color={'red'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={eventData.location}
                        onChange={(e)=>{
                            setEventData(prev => {
                                let newData = {...prev}
                                newData.location = e.nativeEvent.text
                                return newData
                            })
                        }}
                        />
                    </View>
                </View>
                <View style={styles.btn}>

                    {/* Cancel button */}
                    <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'yellow'}
                    onPress={()=>{
                        setEventData(event)
                        setEditMode(false)
                    }}
                    disabled={isProcessing}
                    >
                    <Text style={styles.btnText}>Cancel</Text>
                    </TouchableHighlight>

                    {/* Save button */}
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor={'yellow'}
                        onPress={updateEvent}
                        disabled={isProcessing}
                    >
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    // END OF EDIT MODE RETURN


    // VIEW ONLY MODE FOR THE EVENT
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
                    <>
                    <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'yellow'}
                    onPress={()=>{setEditMode(true)}}
                    disabled={isProcessing}
                    >
                    <Text style={styles.btnText}>Edit event</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'yellow'}
                    onPress={removeEvent}
                    disabled={isProcessing}
                    >
                    <Text style={styles.btnText}>Delete event</Text>
                    </TouchableHighlight>
                    </>
                }
            </View>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor={'yellow'}
                    onPress={toggleFav}
                    disabled={isProcessing}
                    style={{marginTop: 50,}}
                >
                    <Text style={styles.btnText}>{eventData.favorites.includes(uid) ? "Remove from favorites" : "Add to favorites"}</Text>
                </TouchableHighlight>
        </View>
    )
}