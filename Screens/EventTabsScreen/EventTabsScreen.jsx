// React imports
import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

// Navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Styling imports
import Ionicons from '@expo/vector-icons/Ionicons';

// Components and screens imports
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { EventStackContainer } from '../EventStackContainer/EventStackContainer';
import { FavsScreen } from '../FavsScreen/FavsScreen';


export const EventTabsScreen = ({events, setter, loading, logout, uid}) => {

    const Tab = createBottomTabNavigator()

    const [showAddEvent, setShowAddEvent] = useState(false)

    const hideModal = () => {setShowAddEvent(false)}

    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
            headerShown: false,
            }}>
                <Tab.Screen 
                name="Events"
                children={() => loading ? <LoadingScreen/> : <EventStackContainer setter={setter} uid={uid} events={events} showModal={showAddEvent} hideModal={hideModal}/>}
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
                ),
                headerRight: ()=>(
                    <Pressable
                        onPressOut={()=>{setShowAddEvent(true)}}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10,}}>
                            <Ionicons name='add'/>
                            <Text style={{paddingHorizontal: 5,}}>Add Event</Text>
                        </View>
                    </Pressable>
                )
                }}
                />

                <Tab.Screen
                name="Favorites"
                children={()=> <FavsScreen uid={uid} events={events} setter={setter}/>}
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