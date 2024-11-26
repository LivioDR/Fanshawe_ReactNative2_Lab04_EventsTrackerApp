import { db } from "../config/firebase";
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

const collectionName = "events"

// Function to return all the events registered in the database
const getAllEvents = async() => {
    let events = []

    const response = await getDocs(collection(db, collectionName));
    response.forEach((doc) => {
        events.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return events
}

const updateEventById = (id, data) => {

}

// Function to add a new event to the database
const addNewEvent = async(data) => {
    const id = String(data.id)
    const event = {
        ...data
    }
    delete event.id

    console.log(id)
    console.log(event)

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

const toggleFavoriteById = (id, uid) => {

}

export { getAllEvents, updateEventById, addNewEvent, deleteEventById, toggleFavoriteById }