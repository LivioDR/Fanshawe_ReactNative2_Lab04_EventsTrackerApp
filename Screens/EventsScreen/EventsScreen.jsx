import { FlatList, View } from "react-native";
import { EventCard } from "./EventCard/EventCard";
import { eventsPlaceholder } from "../../utilities/eventsPlaceholder";

export const EventsScreen = () => {
    return(
        <View style={{
            backgroundColor: '#202020',
        }}>
            <FlatList
                data={eventsPlaceholder}
                keyExtractor={item => item.id}
                renderItem={item => <EventCard name={item.item.name} starts={item.item.starts} />}
            />
        </View>
    )
}