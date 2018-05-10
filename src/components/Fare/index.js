import React from "react";
import { Text } from "react-native";
import { View } from "native-base";

import styles from "./fareStyle.js";

export const Fare = ({ fare, ETA, ETAG, map_loading	 }) => {	
	return (
		<View style={styles.fareContainer}>
			<Text>
				<Text style={styles.fareText}> TAXI/GOOGLE FARE:</Text> <Text style={styles.amount}>{fare}</Text>
			</Text>
			<Text>
				<Text style={styles.fareText}> PUBLIC TRANSPORT FARE:</Text> <Text style={styles.amount}>min 20, max 80</Text>
			</Text>
			<Text>

				<Text style={styles.fareText}> TAXI ETA:</Text> <Text style={styles.amount}>{ETAG}mins</Text>
			</Text>
			<Text>
				<Text style={styles.fareText}> PUBLIC TRANSPORT ETA:</Text> <Text style={styles.amount}>{ETA}mins</Text>
			</Text>
		</View>

	);
}

export default Fare;