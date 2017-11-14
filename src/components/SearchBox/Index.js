import React from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./SearchBoxStyles.js";

export const SearchBox = ({getInputData, toggleSearchResultModal, getAddressPredictions})=> {

	function handleInput(key,val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}
	function SourceFocus(){
		toggleSearchResultModal('Source');
	}
	function DestFocus(){
		toggleSearchResultModal('Destination');
	}

		return(
			<View style={styles.searchBox}>
        <View style={styles.inputWrapper}>
					<Text style={styles.label}>Source</Text>
					<InputGroup>
						<Input
							onFocus={SourceFocus.bind()}
							style={styles.inputSearch}
							placeholder="Choose Starting Point"
							onChangeText={handleInput.bind(this,"Source")}
						/>
					</InputGroup>
        </View>
        <View style={styles.inputWrapper}>
					<Text style={styles.label}>Destination</Text>
					<InputGroup>
						<Input
							onFocus={DestFocus.bind()}
							style={styles.inputSearch}
							placeholder="Choose Destination Point"
							onChangeText={handleInput.bind(this,"Destination")}
						/>
					</InputGroup>
        </View>
			</View>

		);
};

export default SearchBox;
