import { useState, useEffect } from 'react';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { isUserLoggedIn } from './services/authentication';
import LoggedInPlaceholder from './Screens/LoggedInPlaceholder';
import { EventsScreen } from './Screens/EventsScreen/EventsScreen';

export default function App() {

  const [user, setUser] = useState(undefined)

  useEffect(()=>{
    (async() => {
      const authStatus = await isUserLoggedIn()
      if(authStatus.success){
        setUser(authStatus.message)
      }
    })()
  },[])


  if(!user){
    return (
      <LoginScreen setUser={setUser}/>
    );
  }

  return(
    <EventsScreen/>
  )
}