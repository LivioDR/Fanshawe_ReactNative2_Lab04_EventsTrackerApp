import { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableHighlight, Pressable } from "react-native";
import { areFieldsValid, login, signUp } from "../../services/authentication";
import styles from "./LoginScreenStyles";


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
                source={require('../../assets/loginBg.jpg')}
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
                            underlayColor={'black'}
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
                        style={styles.toggleText}
                    >{isLogin? `New to the app? Sign up` : `Already a user? Sign in`}</Text>    
                </Pressable>
            </ImageBackground>
        </View>
    )
}
