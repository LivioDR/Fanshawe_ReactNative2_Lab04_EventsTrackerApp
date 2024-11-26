import { useState } from "react";
import { View, Text, TextInput, Modal, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        flexWrap: 'wrap',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10,
    },
    icons: {
        size: 32,
    },
    detailTextWrapper: {
        alignItems: 'flex-start',
        padding: 10,
        width: '70%',
    },
    detailText: {
        paddingHorizontal: 10,
        color: 'white',
    },
    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50,
    },
    btnText: {
        borderRadius: 10,
        backgroundColor: 'gold',
        color: 'black',
        fontSize: 18,
        padding: 20,
        marginVertical: 0,
    }
})

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