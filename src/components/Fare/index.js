import React from "react";
import {Text} from "react-native";
import { View} from "native-base";

import styles from "./fareStyle.js";

export const Fare = ({fare})=>{
	return (
		<View style={styles.fareContainer}>
			<Text>
				<Text style={styles.fareText}> TAXI FARE:</Text> <Text style={styles.amount}>{fare}</Text>
                <Text style={styles.fareText}> BUS FARE:</Text> <Text style={styles.amount}>min 40, max 80</Text>
			</Text>
			
		</View>

	);
}

export default  Fare;