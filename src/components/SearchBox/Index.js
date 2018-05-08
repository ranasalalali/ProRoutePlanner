import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./SearchBoxStyles.js";

export const SearchBox = ({ getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	selectedSourceAddress,
	selectedDestinationAddress }) => {


	const { selectedSource } = selectedSourceAddress || {};
	const { selectedDestination } = selectedDestinationAddress || {};
	function handleInput(key, val) {
		getInputData({
			key,
			value: val
		});
		getAddressPredictions();
	}
	function SourceFocus() {
		toggleSearchResultModal('Source');
	}
	function DestFocus() {
		toggleSearchResultModal('Destination');
	}

	return (
		<View style={styles.searchBox}>
			<View style={styles.inputWrapper}>
				<InputGroup>
					<Icon name='search' style={{ color: 'black' }} />
					<Input
						onFocus={SourceFocus.bind()}
						style={styles.inputSearch}
						placeholder="Choose Starting Point"
						onChangeText={handleInput.bind(this, "Source")}
						value={selectedSource && selectedSource.name}
					/>
				</InputGroup>
			</View>
			<View style={styles.inputWrapper}>
				<InputGroup>
					<Icon name='search' style={{ color: 'black' }} />
					<Input
						onFocus={DestFocus.bind()}
						style={styles.inputSearch}
						placeholder="Choose Destination Point"
						onChangeText={handleInput.bind(this, "Destination")}
						value={selectedDestination && selectedDestination.name}
					/>
				</InputGroup>
			</View>
		</View>

	);
};

export default SearchBox;
