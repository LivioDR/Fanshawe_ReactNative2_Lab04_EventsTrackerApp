import { useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";


const styles = StyleSheet.create({
    container: {

    },
    bgImage: {

    },
    label: {

    },
    input: {

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
            </ImageBackground>
        </View>
    )
}
