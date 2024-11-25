import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";


// Function to check if the user is currently logged in or not
// If it is logged in, it returns true and the uid
const isUserLoggedIn = async() => {
    const response = {
        success: false,
        message: "",
    }
    
    const status = await onAuthStateChanged(auth, (user) => {
        if (user) {
            response.success = true
            response.message = user.uid
        } else {
            response.success = false
        }
    })

    return response
}

// Function to log in a user
// Returns an object with a boolean success value and a message
const login = async(email, password) => {
    const response = {
        success: false,
        message: ""
    }

    try{
        const request = await signInWithEmailAndPassword(auth, email, password)
        response.success = true
        response.message = request.user.uid
    }
    catch(e){
        response.success = false
        response.message = e.message
    }
    return response
}

// Function to log out a user
const logout = async(setUser) => {
    signOut(auth).then(() => {
        setUser(undefined)
      }).catch((error) => {
        console.e(error)
      });
}

// Function to sign up a new user
// Returns an object with a boolean success value and a message
const signUp = async(email, password) => {
    const response = {
        success: false,
        message: ""
    }

    try{
        const request = await createUserWithEmailAndPassword(auth, email, password)
        console.log(request.user)
        response.success = true
        response.message = request.user.uid
    }
    catch(e){
        response.success = false
        response.message = e.message
    }
    return response
}



// Checks if the passed email has a valid format
// Regex from https://regexr.com/3e48o
const isEmailValid = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)
}

// Checks all fields and returns a success boolean value and a message
const areFieldsValid = (email, password) => {
    // Creating the response object to return
    let response = {
        success: false,
        message: ""
    }

    // Then checks that the email field is not empty
    if(!email || email?.trim() == ""){
        response.success = false,
        response.message = "Please enter an email"

        return response
    }
    
    // Then, checks that the email has a valid format
    if(!isEmailValid(email)){
        response.success = false,
        response.message = "Invalid email format"
        
        return response
    }
    
    // Last, checks the password field
    if(!password || password?.trim() == ""){
        response.success = false,
        response.message = "Please enter a password"

        return response
    }

    // If all checks pass, returns true an no error messages
    response.success = true
    return response
}

export { areFieldsValid, isUserLoggedIn, login, logout, signUp }