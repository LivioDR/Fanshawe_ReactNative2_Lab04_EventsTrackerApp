// React imports
import { View, Text } from "react-native";

// Navigation imports
import { useRoute } from "@react-navigation/native";

export const EventDetails = ({setter, uid}) => {

    // getting the data for the screen from the route params
    const route = useRoute()
    const event = route.params
    console.log(event)

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        }}>
            <Text>{JSON.stringify(event)}</Text>
        </View>
    )
}