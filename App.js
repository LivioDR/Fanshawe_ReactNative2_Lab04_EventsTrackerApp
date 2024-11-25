import { useState } from 'react';
import { LoginScreen } from './Screens/LoginScreen';
import { View, Text } from 'react-native';

export default function App() {

  const [user, setUser] = useState(undefined)


  if(!user){
    return (
      <LoginScreen setUser={setUser}/>
    );
  }

  return(
    <View>
      <Text>Successfully logged in!</Text>
      <Text>{user}</Text>
    </View>
  )
}