import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
    },
})

const LoadingScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Loading</Text>
            <ActivityIndicator size={'large'}/>
        </View>
    )
}
export default LoadingScreen