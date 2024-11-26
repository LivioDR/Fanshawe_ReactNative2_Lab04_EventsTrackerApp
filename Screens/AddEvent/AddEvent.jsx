import { useState } from "react";
import { View, Text, TextInput, Modal } from "react-native";
import styles from "./AddEventStyles";



export const AddEvent = ({uid, visible, hide}) => {

    const [name, setName] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [hour, setHour] = useState(new Date().toISOString().split("T")[1].split(".")[0])
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

        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}>
                <TextInput
                style={styles.title}
                value={name}
                onChange={setName}
                />
                <View style={styles.detailContainer}>
                    <Ionicons name="calendar-outline" size={styles.icons.size} color={'purple'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={date}
                        onChange={setDate}
                        />
                        <TextInput 
                        style={styles.detailText}
                        value={hour}
                        onChange={setHour}
                        />
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <Ionicons name="location-outline" size={styles.icons.size} color={'red'} />
                    <View style={styles.detailTextWrapper}>
                        <TextInput 
                        style={styles.detailText}
                        value={location}
                        onChange={setLocation}
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