import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./components/Home";
import Pick from "./components/Pick";

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);

	return (
		<SafeAreaView style={Base.container}>
				<NavigationContainer>
					<Tab.Navigator screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
						let iconName = Base.routeIcons[route.name] || 'alert';
						return <Entypo name={iconName} size={size} color={color} />;
						},
						tabBarActiveTintColor: 'hsl(120, 30%, 40%)',
						tabBarInactiveTintColor: 'gray',
					})}
					>
						<Tab.Screen name="Lager">
							{() => <Home products={products} setProducts={setProducts}/>}
						</Tab.Screen>
						<Tab.Screen name="Plock">
							{() => <Pick setProducts={setProducts}/>}
						</Tab.Screen>
					</Tab.Navigator>
				</NavigationContainer>
				<StatusBar style="auto" />
		</SafeAreaView>
		);
};
