import { useState, useEffect } from 'react';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { isUserLoggedIn, logout } from './services/authentication';
import { EventTabsScreen } from './Screens/EventTabsScreen/EventTabsScreen';
import { eventsPlaceholder } from './utilities/eventsPlaceholder';

export default function App() {

  const [user, setUser] = useState(undefined)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async() => {
      const authStatus = await isUserLoggedIn()
      if(authStatus.success){
        setUser(authStatus.message)
      }

    // get events from Firebase
    // TODO: change placeholder to actual data
    setEvents(eventsPlaceholder)
    setTimeout(()=>{
      setLoading(false)
    },2500)

    })()

  },[])


  if(!user){
    return (
      <LoginScreen setUser={setUser}/>
    );
  }

  return(
    <EventTabsScreen loading={loading} setter={setEvents} events={events} uid={user} logout={()=>{logout(setUser)}}/>
  )
}