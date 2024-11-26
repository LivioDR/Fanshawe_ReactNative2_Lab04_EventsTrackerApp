const isDateValid = (date) => {
    if(!date){
        return false
    }
    if(date.trim() == ""){
        return false
    }
    // checks that the passed date matches the format YYYY-MM-DD
    return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date.trim())
}

const isTimeValid = (time) => {
    if(!time){
        return false
    }
    if(time.trim() == ""){
        return false
    }

    // checks that the passed time matches the format HH:MM:SS
    return /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(time.trim())
}

export { isDateValid, isTimeValid }