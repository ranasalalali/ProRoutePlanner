import React, { Component } from 'react';
import {
	Text, Image, TouchableOpacity
} from 'react-native';
import { Content, Icon, Button, List, View, ListItem, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class BusSideBar extends Component {
	constructor(props) {
		super(props);
	}

	logout() {
		Actions.login();
		Actions.pop();
	}
	render() {

		return (
			<Content style={{ backgroundColor: '#FFFFFF' }}>
				<Image style={{ backgroundColor: 'black', alignItems: 'center', alignSelf: 'center' }} source={require('../../Images/ProRoutePlannerBlack.jpg')} />
				<List>
					<View>
						<ListItem onPress={() => {
							Actions.pop()
							Actions.busdrivermain()
						}}>
							<Left>
								<Icon name='home' />
							</Left>
							<Body>
								<Text>Home</Text>
							</Body>
							<Right>
								<Icon name='arrow-forward' />
							</Right>
						</ListItem>
						<ListItem onPress={() => {
							Actions.pop()
							Actions.busroutes()
						}}>
							<Left>
								<Icon name='bus' />
							</Left>
							<Body>
								<Text>Bus Routes</Text>
							</Body>
							<Right>
								<Icon name='arrow-forward' />
							</Right>
						</ListItem>
						
						<ListItem onPress={() => {
							Actions.pop()
							Actions.login()

						}}>
							<Left>
								<Icon style={{ color: 'red' }} name='power' />
							</Left>
							<Body>
								<Text style={{ color: 'red' }}>Logout</Text>
							</Body>
							<Right>
							</Right>
						</ListItem>
					</View>
				</List>
			</Content>
		);
	}
}

module.exports = BusSideBar;
