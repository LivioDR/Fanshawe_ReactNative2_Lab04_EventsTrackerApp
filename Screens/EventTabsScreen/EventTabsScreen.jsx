// React imports
import { Pressable, Text, View } from 'react-native';

// Navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';
import { EventsScreen } from '../EventsScreen/EventsScreen';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { FavsScreen } from '../FavsScreen/FavsScreen';


export const EventTabsScreen = ({events, loading, logout, uid}) => {

    const Tab = createBottomTabNavigator()

    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
            headerShown: false,
            }}>
                <Tab.Screen 
                name="Events"
                children={() => loading ? <LoadingScreen/> : <EventsScreen uid={uid} events={events}/>}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                    name="calendar"
                    size={size}
                    color={color}
                    />
                ),
                headerShown: true,
                headerTitle: "Events",
                // includes a button on the left corner to log out from the app
                headerLeft: ()=>(
                    <Pressable
                        onPressOut={logout}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10,}}>
                            <Ionicons name='arrow-back'/>
                            <Text style={{paddingHorizontal: 5,}}>Log Out</Text>
                        </View>
                    </Pressable>
                )
                }}
                />

                <Tab.Screen
                name="Favorites"
                children={()=> <FavsScreen uid={uid} events={events}/>}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                        name="star"
                        size={size}
                        color={color}
                        />
                    ),
                    headerShown: true
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )


}