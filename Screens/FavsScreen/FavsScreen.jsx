import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { EventCard } from "../EventsScreen/EventCard/EventCard";

export const FavsScreen = ({events,uid, setter}) => {

    const [favEvents, setFavEvents] = useState(events.filter(event => event.favorites.includes(uid)))

    useEffect(()=>{
        setFavEvents(events.filter(event => event.favorites.includes(uid)))
    },[events])

    return(
        <View style={{
            backgroundColor: '#202020',
            height: '100%',
        }}>
            <FlatList
                data={favEvents}
                keyExtractor={item => item.id}
                renderItem={item => 
                    <EventCard
                    id={item.item.id} 
                    name={item.item.name} 
                    uid={uid} 
                    createdBy={item.item.createdBy} 
                    starts={item.item.starts} 
                    favorites={item.item.favorites}
                    location={item.item.location}
                    />}
            />
        </View>
    )
}