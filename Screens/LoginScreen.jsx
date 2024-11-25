import { useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableHighlight } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        margin: 'auto',
        backgroundColor: '#3d3d3db0'
    },
    label: {
        fontSize: 20,
        fontWeight: 800,
        paddingTop: 12,
        paddingBottom: 5,
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        width: '80%',
        marginHorizontal: '10%',
        padding: 10,
    },
    btnContainer: {
        marginVertical: 30,
        width: '60%',
        margin: 'auto',
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    btnHighlight: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    }
})

export const LoginScreen = () => {

    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    return(
        <View style={styles.container}>
            <ImageBackground 
                style={styles.bgImage}
                source={require('../assets/loginBg.jpg')}
                >
                <View style={styles.formContainer}>

                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        />

                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput 
                        style={styles.input}
                        value={pass}
                        onChangeText={setPass}
                        />

                    <View style={styles.btnContainer}>
                        <TouchableHighlight
                            style={styles.btnHighlight}
                            activeOpacity={0.6}
                            underlayColor={'teal'}
                            onPress={()=>{console.log("Pressed!")}}
                            >
                                <Text style={styles.btnText}>
                                    Login
                                </Text>
                        </TouchableHighlight>
                    </View>
                        
                </View>
            </ImageBackground>
        </View>
    )
}
