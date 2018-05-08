import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { Container, Text, View, Header, Content, Form, Item, Left, Input, Button, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/FontAwesome";
class RegisterMain extends Component {


  constructor(props) {
    super(props);
    this.state = { User: false, Driver: false };
  }

  onUserButtonPress = () => {
    this.setState({
      User: true,
      Driver: false
    });
  }
  onDriverButtonPress = () => {
    this.setState({
      User: false,
      Driver: true
    });
  }


  onUserRegister = () => {

  }
  onBusButtonPress = () => {
    Actions.registerbusdriver();
  }
  onRickshawButtonPress = () => {
    Actions.registerrickshawdriver();
  }
  onTaxiButtonPress = () => {
    Actions.registertaxidriver();
  }

  Form() {
    if (this.state.User)
      return (
        <Card style={{ alignItems: 'center' }}>
          <CardItem>
            <Text style={{ alignSelf: 'center' }}>User Registration</Text>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                label="Name"
                placeholder="Enter Name"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                label="Email"
                placeholder="Enter Email"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                label="Enter Password"
                placeholder="Password"
              />
            </Item>
          </CardItem>
          <CardItem>
            <Button full dark onPress={this.onUserRegister}>
              <Text style={{ color: 'white' }}>Register</Text>
            </Button>
          </CardItem>
        </Card>
      )
    if (this.state.Driver)
      return (
        <Card style={{ alignItems: 'center' }}>
          <CardItem>
            <Text>Which vehicle driver are you?</Text>
          </CardItem>
          <CardItem>
            <Button full dark onPress={this.onBusButtonPress}>
              <Text style={{ color: 'white' }}>Bus Driver</Text>
            </Button>
            <Text> </Text>
            <Button full dark onPress={this.onTaxiButtonPress}>
              <Text style={{ color: 'white' }}>Taxi Driver</Text>
            </Button>
            <Text> </Text>
            <Button full dark onPress={this.onRickshawButtonPress}>
              <Text style={{ color: 'white' }}>Rickshaw Driver</Text>
            </Button>
          </CardItem>
        </Card>
      )
  }


  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
          <Body>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Registration</Text>
          </Body>
        </Header>
        <Content>
          <Card style={{ alignItems: 'center' }}>
            <CardItem>
              <Text style={{ alignSelf: 'center' }}>Who Are You?</Text>
            </CardItem>
            <CardItem>
              <Button full dark onPress={this.onUserButtonPress}>
                <Text style={{ color: 'white' }}>User</Text>
              </Button>
              <Text> </Text>
              <Button full dark onPress={this.onDriverButtonPress}>
                <Text style={{ color: 'white' }}>Driver</Text>
              </Button>
            </CardItem>
          </Card>
          {this.Form()}

        </Content>

      </Container>
    );
  }
}

export default RegisterMain;
