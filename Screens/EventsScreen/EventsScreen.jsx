import { FlatList, View } from "react-native";
import { EventCard } from "./EventCard/EventCard";

export const EventsScreen = ({events,uid}) => {
    return(
        <View style={{
            backgroundColor: '#202020',
        }}>
            <FlatList
                data={events}
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