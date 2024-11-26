import { FlatList, View } from "react-native";
import { EventCard } from "./EventCard/EventCard";
import { AddEvent } from "../AddEvent/AddEvent";

export const EventsScreen = ({events,uid, showModal, hideModal}) => {
    return(
        <View style={{
            backgroundColor: '#202020',
        }}>
            <AddEvent uid={uid} visible={showModal} hide={hideModal}/>
            <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={item => 
                    <EventCard 
                    id={item.item.id}
                    interactive={true}
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