import { useState } from "react";
import { View, Text, TextInput, Modal, TouchableHighlight } from "react-native";

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./AddEventStyles";



export const AddEvent = ({uid, visible, hide}) => {

    const [name, setName] = useState("")
    const [date, setDate] = useState()
    const [hour, setHour] = useState()
    const [location, setLocation] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    

    const cancel = () => {
        hide()
    }

    const save = () => {
        setIsProcessing(true)
        // TODO: create data structure

        // TODO: add data to Firestore

        // TODO: add data locally


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
                <Text style={styles.title}>Event Name</Text>
                <TextInput
                style={styles.titleInput}
                value={name}
                onChange={setName}
                />
                <Text style={styles.dateLabel}>Date and time</Text>
                <View style={styles.detailContainer}>
                    <Ionicons name="calendar-outline" size={styles.icons.size} color={'purple'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={date}
                        onChange={setDate}
                        placeholder="Date (YYYY-MM-DD)"
                        />
                        <TextInput 
                        style={styles.detailText}
                        value={hour}
                        onChange={setHour}
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
                        value={location}
                        onChange={setLocation}
                        placeholder="Enter the location"
                        />
                    </View>
                </View>
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