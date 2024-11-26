// React imports
import { useState, useEffect } from 'react';

// Screens and components imports
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { logout } from './services/authentication';
import { EventTabsScreen } from './Screens/EventTabsScreen/EventTabsScreen';
import { eventsPlaceholder } from './utilities/eventsPlaceholder';

// Config and database imports
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {

  const [user, setUser] = useState(undefined)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // subscribe to the onAuthStateChanged event
    const loginSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // and if the user is authenticated, moves to the next screen
        setUser(firebaseUser.uid)
      }
    })

    // get events from Firebase
    // TODO: change placeholder to actual data
    setEvents(eventsPlaceholder)
    setTimeout(()=>{
      setLoading(false)
    },500)


    // clean up when unmounting
    return loginSub

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