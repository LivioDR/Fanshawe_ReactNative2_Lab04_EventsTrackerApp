// React imports
import { useState, useEffect } from 'react';

// Screens and components imports
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { logout } from './services/authentication';
import { EventTabsScreen } from './Screens/EventTabsScreen/EventTabsScreen';

// Config and database imports
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getAllEvents } from './services/database';

export default function App() {

  const [user, setUser] = useState(undefined)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // get events from Firebase
    (async()=>{
      // getting all the events from Firebase
      const events = await getAllEvents()
      // then sorting them by starting time
      events.sort((a,b) => { return new Date(a.starts).getTime() - new Date(b.starts).getTime()})
      // to finally add them to the state hook and dismiss the loading spinner
      setEvents(events)
      setLoading(false)

    })()    
    
    // subscribe to the onAuthStateChanged event
    const loginSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // and if the user is authenticated, moves to the next screen
        setUser(firebaseUser.uid)
      }
    })

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