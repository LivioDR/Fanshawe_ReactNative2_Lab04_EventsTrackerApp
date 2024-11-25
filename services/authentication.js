import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


const login = async(email, password) => {
    const response = {
        success: false,
        message: ""
    }

    try{
        const request = await signInWithEmailAndPassword(auth, email, password)
        console.log(request.user)
        response.success = true
        response.message = request.user
    }
    catch(e){
        response.success = false
        response.message = e.message
    }
    return response
}

const signUp = async(email, password) => {
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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

export { areFieldsValid, login }