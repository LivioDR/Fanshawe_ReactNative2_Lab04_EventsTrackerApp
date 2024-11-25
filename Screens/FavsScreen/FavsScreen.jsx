import { useState } from "react";
import { FlatList, View } from "react-native";
import { EventCard } from "../EventsScreen/EventCard/EventCard";

export const FavsScreen = ({events,uid}) => {

    const [favEvents, setFavEvents] = useState(events.filter(event => event.favorites.includes(uid)))

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
                    name={item.item.name} 
                    uid={uid} 
                    createdBy={item.item.createdBy} 
                    starts={item.item.starts} 
                    favorites={item.item.favorites}
                    />}
            />
        </View>
    )
}