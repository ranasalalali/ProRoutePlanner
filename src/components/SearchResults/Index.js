import React from "react";
import { Text } from "react-native";
import { View, List, ListItem, InputGroup, Input, Left, Body, Icon, Container } from "native-base";
import styles from "./SearchResultsStyles.js";
import RNGooglePlaces from 'react-native-google-places';
export const SearchResults = ({ predictions, getSelectedAddress }) => {

	function handleSelectedAddress(placeID) {
		getSelectedAddress(placeID)
	};

	function list() {
		if (predictions.length > 0) {
			return (
				<List
					dataArray={predictions}
					renderRow={(item) =>
						<View>
							<ListItem onPress={() => handleSelectedAddress(item.placeID)} button avatar>
								<Left style={styles.leftContainer}>
									<Icon name='pin' />
								</Left>
								<Body>
									<Text style={styles.primaryText}>{item.primaryText}</Text>
									<Text style={styles.secondaryText}>{item.secondaryText}</Text>
								</Body>
							</ListItem>
						</View>
					}
				/>
			);
		}
	}

	return (
		<View style={styles.searchResultsWrapper}>
			{list()}
		</View>
	);
};

export default SearchResults;
