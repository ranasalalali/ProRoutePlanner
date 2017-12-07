import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container,Text,View, Header, Content, Form, Item, Input, Button,Card,CardItem } from 'native-base';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';

class RegisterMain extends Component {

  constructor(props) {
    super(props);
    this.state = {User: false, Driver: false};
  }

  onUserButtonPress = () => {
    this.setState({
      User: true,
      Driver:false
    });
  }
  onDriverButtonPress = () => {
    this.setState({
      User: false,
      Driver: true
    });
  }

  onBusButtonPress = () => {
    Actions.registerbusdriver();
  }
  onTaxiButtonPress = () => {
    Actions.registertaxidriver();
  }

  Form(){
    if(this.state.User)
      return(
        <Card style={{alignItems:'center'}}>
          <CardItem>
              <Item rounded>
                <Input
                  label="Phone"
                  placeholder="+923473369206"
                />
              </Item>
          </CardItem>
          <CardItem>
              <Item rounded>
                <Input
                  secureTextEntry
                  label="Password"
                  placeholder="password"
                />
              </Item>
          </CardItem>
          <CardItem>
              <Item rounded>
              <Button full rounded info>
                <Text style={{color:'white'}}>Register</Text>
              </Button>
              </Item>
          </CardItem>
        </Card>
      )
    if(this.state.Driver)
      return(
        <Card style={{alignItems:'center'}}>
          <CardItem>
                <Button full rounded info onPress={this.onBusButtonPress}>
                  <Text style={{color:'white'}}>Bus Driver</Text>
                </Button>
                <Button full rounded info onPress={this.onTaxiButtonPress}>
                  <Text style={{color:'white'}}>Taxi Driver</Text>
                </Button>
          </CardItem>
        </Card>
      )
  }


  render() {
    return (
      <Container>
        <Content>
          <Card style={{alignItems:'center'}}>
            <CardItem>
              <Text style={{alignSelf:'center'}}>Who Are You?</Text>
            </CardItem>
            <CardItem>
                    <Button full rounded info onPress={this.onUserButtonPress}>
                      <Text style={{color:'white'}}>User</Text>
                    </Button>
                    <Button full rounded info onPress={this.onDriverButtonPress}>
                      <Text style={{color:'white'}}>Driver</Text>
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
