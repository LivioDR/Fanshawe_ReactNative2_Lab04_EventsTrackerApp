import { View, Text, Pressable } from "react-native"
import { logout } from "../services/authentication"

export default LoggedInPlaceholder = ({user, setUser}) => {
    return(<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <Text>Successfully logged in!</Text>
        <Text>{user}</Text>
        <Pressable
          onPressOut={()=>{logout(setUser)}}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>)
}