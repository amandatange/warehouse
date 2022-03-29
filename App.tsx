import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Stock from './components/Stock';
import warehouse from './assets/warehouse.jpg';
import plant from './assets/plant.jpg';


export default function App() {



	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={plant} resizeMode="cover" style={styles.background}>
				<View style={styles.base}>
					<Text style={styles.header}>PlantHome</Text>
					{/* <Image source={warehouse} style={{ width: 320, height: 240 }} /> */}
					<Stock />
					<StatusBar style="auto" />
				</View>
			</ImageBackground>
		</SafeAreaView>
		);
}

const styles = StyleSheet.create({
	header: {
		color: 'hsl(120, 15%, 50%)',
		fontSize: 42,
		textAlign: "center"
	},
	container: {
		flex: 1,
	},
	background: {
		flex: 1
	},
	base: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30,
	}
});
