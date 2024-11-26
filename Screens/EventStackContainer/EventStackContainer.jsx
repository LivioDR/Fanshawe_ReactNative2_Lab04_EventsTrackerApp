import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventsScreen } from "../EventsScreen/EventsScreen";
import { EventDetails } from "../EventDetails/EventDetails";


export const EventStackContainer = ({events, setter, uid, showModal, hideModal}) => {

    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator initialRouteName="Events List">
            <Stack.Screen
                name="Events List"
                children={() => <EventsScreen events={events} uid={uid} showModal={showModal} hideModal={hideModal}/>}
                options={{
                    headerShown: false,
                }}
                />

            <Stack.Screen
                name="Event details"
                children={() => <EventDetails setter={setter} uid={uid} />}
                options={{
                    headerTitle: "Edit event",
                }}
            />
    </Stack.Navigator>
    )
}