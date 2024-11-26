// React imports
import { useState } from "react";
import { View, Text, TextInput, Modal, TouchableHighlight } from "react-native";

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./AddEventStyles";

// Functions imports
import { isDateValid, isTimeValid } from "../../services/inputValidation";
import uuid from 'react-native-uuid';
import { addNewEvent } from "../../services/database";


export const AddEvent = ({uid, visible, hide, setter}) => {

    // creating an initial object to be used as a starting point for this form
    const initialData = {
        name: "",
        date: "",
        time: "",
        location: "",
        favorites: [],
        createdBy: uid,
        id: uuid.v4(),
    }

    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState("")

    const [dataToAdd, setDataToAdd] = useState(initialData)

    const cancel = () => {
        setDataToAdd(initialData)
        hide()
    }

    const save = async() => {
        setIsProcessing(true)
        setError("")

        // START OF VALIDATION OF INPUTS
        // Event name
        if(!dataToAdd.name || dataToAdd.name.trim() == ""){
            setError("Please enter a name for the event")
            setIsProcessing(false)
            return false
        }
        // Date
        if(!isDateValid(dataToAdd.date.trim())){
            setError("Please enter a valid date in the format YYYY-MM-DD")
            setIsProcessing(false)
            return false
        }
        // Time
        if(!isTimeValid(dataToAdd.time.trim())){
            setError("Please enter a valid time in the format HH:MM:SS")
            setIsProcessing(false)
            return false
        }
        // Location
        if(!dataToAdd.location){
            setError("Please enter a location")
            setIsProcessing(false)
            return false
        }
        // END OF VALIDATION

        // refactor `dataToAdd` to match the object structure
        const formattedData = {
            name: dataToAdd.name,
            starts: `${dataToAdd.date.trim()}T${dataToAdd.time.trim()}`,
            location: dataToAdd.location,
            favorites: [],
            createdBy: uid,
            id: dataToAdd.id,
        }


        // add the formatted data to the database
        await addNewEvent(formattedData)


        // add data locally
        setter(prev => {
            let newData = [...prev]
            newData.push(formattedData)
            return newData
        })

        // clear the form
        setDataToAdd(initialData)
        // remove processing flag and hide the modal
        setIsProcessing(false)
        hide()
    }


    return(
        <Modal
        transparent={false}
        visible={visible}
        animationType="slide"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>
                <Text style={styles.title}>Event</Text>
                <TextInput
                style={styles.titleInput}
                value={dataToAdd.name}
                onChange={(e) => setDataToAdd(prev=> {
                    newData = {...prev}
                    newData.name = e.nativeEvent.text
                    return newData
                })}
                placeholder="Enter a name for the event"
                />
                <Text style={styles.dateLabel}>Date and time</Text>
                <View style={styles.detailContainer}>
                    <Ionicons name="calendar-outline" size={styles.icons.size} color={'purple'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={dataToAdd.date}
                        onChange={(e) => setDataToAdd(prev=> {
                            newData = {...prev}
                            newData.date = e.nativeEvent.text
                            return newData
                        })}
                        placeholder="Date (YYYY-MM-DD)"
                        />
                        <TextInput 
                        style={styles.detailText}
                        value={dataToAdd.time}
                        onChange={(e) => setDataToAdd(prev=> {
                            newData = {...prev}
                            newData.time = e.nativeEvent.text
                            return newData
                        })}
                        placeholder="Time (HH:MM:SS)"
                        />
                    </View>
                </View>
                <Text style={styles.dateLabel}>Location</Text>
                <View style={styles.detailContainer}>
                    <Ionicons name="location-outline" size={styles.icons.size} color={'red'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={dataToAdd.location}
                        onChange={(e) => setDataToAdd(prev=> {
                            newData = {...prev}
                            newData.location = e.nativeEvent.text
                            return newData
                        })}
                        placeholder="Enter the location"
                        />
                    </View>
                </View>
                <Text style={styles.error}>{error}</Text>
                <View style={styles.btn}>
                    {/* Cancel button */}
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor={'yellow'}
                        onPress={cancel}
                        disabled={isProcessing}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableHighlight>
                    {/* Save button */}
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor={'yellow'}
                        onPress={save}
                        disabled={isProcessing}
                    >
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}