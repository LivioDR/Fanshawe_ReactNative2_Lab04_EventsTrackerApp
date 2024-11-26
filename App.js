// React imports
import { useState, useEffect } from 'react';

// Screens and components imports
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';

// Placeholders and mock data imports
// TODO: remove after linking app to Firestore
import LoggedInPlaceholder from './Screens/LoggedInPlaceholder';

// Config and database imports
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {

  const [user, setUser] = useState(undefined)

  useEffect(()=>{
    // subscribe to the onAuthStateChanged event
    const loginSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // and if the user is authenticated, moves to the next screen
        setUser(user.uid)
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
    <LoggedInPlaceholder user={user} setUser={setUser}/>
  )
}