import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

const collectionName = "events"

// Function to return all the events registered in the database
const getAllEvents = async() => {
    let events = []

    const response = await getDocs(collection(db, collectionName));
    response.forEach((doc) => {
        // formatting the events to an array of event objects with their IDs as a key
        events.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return events
}

// Gets a single event by its ID
const getEventById = async(id) => {
    const eventRef = doc(db, collectionName, id);
    const eventSnap = await getDoc(eventRef);
    return eventSnap.data()
}

// Function to update the data in an event
const updateEventInDb = async(data) => {
    // getting the ID from the event and making sure it is a String
    const id = String(data.id)
    // then getting the actual event data
    const event = {...data}
    // and removing the id from inside of the event to add to avoid duplicate data
    delete event.id

    // to finally update the passed data of this event in the database
    try{
        await updateDoc(doc(db, collectionName, id), event)
    }
    catch(e){
        console.error(e)
    }
}

// Function to add a new event to the database
const addNewEvent = async(data) => {
    // getting the ID from the event and making sure it is a String
    const id = String(data.id)
    // then getting the actual event data
    const event = {
        ...data
    }
    // and removing the id from inside of the event to add to avoid duplicate data
    delete event.id

    // to finally send the event data to the database
    try{
        await setDoc(doc(db, collectionName, id), event)
    }
    catch(e){
        console.error(e)
    }
}

// Function to delete an event from the database
const deleteEventById = async(id) => {
    await deleteDoc(doc(db, collectionName, id));
}

// Function to toggle the favorite status for a user with a certain uid
const toggleFavoriteById = async(id, uid) => {
    // gets that event info
    const event = await getEventById(id)

    // checks if the user is part of the favorite array or not
    if(event.favorites.includes(uid)){
        // then removes the user
        event.favorites = event.favorites.filter(ids => ids != uid)
    }
    else{
        // or adds it
        event.favorites.push(uid)
    }

    // last, updates the event info in firebase
    await updateEventInDb({
        id: id,
        ...event
    })

}

export { getAllEvents, updateEventInDb, addNewEvent, deleteEventById, toggleFavoriteById }