import { useState } from "react";
import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableHighlight, Pressable } from "react-native";
import { areFieldsValid, login, signUp } from "../services/authentication";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        marginTop: 100,
        fontSize: 30,
        fontWeight: 100,
    },
    formContainer: {
        width: '90%',
        margin: 'auto',
        backgroundColor: '#3d3d3db0',
        borderRadius: 10,
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
        borderRadius: 5,
    },
    alert: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
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

export const LoginScreen = ({setUser}) => {

    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [isLogin, setIsLogin] = useState(true)
    const [alert, setAlert] = useState("")

    const onLoginPressed = async() => {
        const validation = areFieldsValid(email, pass)
        
        if(!validation.success){
            setAlert(validation.message)
            return
        }

        const loginResult = await login(email,pass)
        if(!loginResult.success){
            setAlert(loginResult.message)
            return
        }

        setUser(loginResult.message)
    }

    const onRegisterPressed = async() => {
        const validation = areFieldsValid(email, pass)
        
        if(!validation.success){
            setAlert(validation.message)
            return
        }

        const registerResult = await signUp(email,pass)
        if(!registerResult.success){
            setAlert(registerResult.message)
            return
        }

        setUser(registerResult.message)
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                style={styles.bgImage}
                source={require('../assets/loginBg.jpg')}
                >
                <Text style={styles.title}>Speak friend and enter</Text>
                <View style={styles.formContainer}>

                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email"
                        />

                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput 
                        style={styles.input}
                        value={pass}
                        onChangeText={setPass}
                        secureTextEntry={true}
                        />

                    <View style={styles.btnContainer}>
                        <TouchableHighlight
                            style={styles.btnHighlight}
                            activeOpacity={0.6}
                            underlayColor={'teal'}
                            onPress={isLogin ? 
                                onLoginPressed : 
                                onRegisterPressed}
                            >
                                <Text style={styles.btnText}>
                                    {isLogin ? "Login" : "Register"}
                                </Text>
                        </TouchableHighlight>
                    </View>
                    {
                        alert &&
                        <Text style={styles.alert}>{alert}</Text>
                    }
                </View>
                <Pressable
                    onPressOut={()=>{
                        setIsLogin(prev => !prev)
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            marginBottom: 50,
                            padding: 12,

                        }}
                    >{isLogin? `New to the app? Sign up` : `Already a user? Sign in`}</Text>    
                </Pressable>
            </ImageBackground>
        </View>
    )
}
