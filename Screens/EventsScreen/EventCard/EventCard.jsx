import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./EventCardStyles";
const moment = require('moment')


export const EventCard = ({name, starts, uid, id, createdBy, favorites, location, interactive = false, setter = ()=>{}}) => {

    const [isFav, setIsFav] = useState(favorites.includes(uid))

    const currentDate = new Date()
    const startsDate = new Date(starts)
    const relativeTime = moment().subtract((currentDate.getTime() - startsDate.getTime())/1000, 's').fromNow()
    
    // Setting up the navigation to the detail page
    const navigation = useNavigation()
    const onTouch = () => {
        navigation.navigate("Event details", {
            name: name,
            starts: starts,
            createdBy: createdBy,
            favorites: favorites,
            id: id,
            location: location,
            relativeTime: relativeTime,
        })
    }

    const removeFavorite = () => {
        // Removes the favorite from the state variable
        setter(prev => {
            let newData = [...prev]
            for(let i=0; i<newData.length; i++){
                if(newData[i].id === id){
                    newData[i].favorites = newData[i].favorites.filter(id => id != uid)
                }
            }
            return newData
        })
        
        // TODO: remove favorite from Firebase
    }

    // Changes the icon on the card every time that the favorites parameter is changed
    useEffect(()=>{
        setIsFav(favorites.includes(uid))
    },[favorites])

    if(interactive){
        return(
            <Pressable
                onPress={onTouch}
            >
                <View style={styles.container}>
                    <View style={styles.dateRow}>
                        <Text style={styles.date}>{starts.split("T").join(" @ ")}</Text>
                        {isFav ? <Ionicons name="star" color={'gold'} size={16} /> : <></>}
                    </View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.relative}>{relativeTime}</Text>
                </View>            
            </Pressable>
        )
    }

    return(
        <View style={{
            ...styles.container,
            flexDirection: 'row-reverse',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 0,
        }}>
            <Pressable
                onPress={removeFavorite}
                style={{
                    width: '10%',
                    alignItems: 'center',
                    marginHorizontal: 5,
                }}
                >
                    <View>
                        <Ionicons name="trash" size={24} color={'red'} style={{paddingVertical: 10, }}/>
                    </View>
            </Pressable>
            <View style={{...styles.container, width: '80%', margin: 0, padding: 0,}}>
                <View style={styles.dateRow}>
                    <Text style={styles.date}>{starts.split("T").join(" @ ")}</Text>
                    {isFav ? <Ionicons name="star" color={'gold'} size={16} /> : <></>}
                </View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.relative}>{relativeTime}</Text>
            </View>
        </View>
    )
}