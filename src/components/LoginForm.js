import React, { Component } from 'react';
import { Platform, StatusBar, DeviceEventEmitter, Image } from 'react-native';
import { View, Container, Text, Content, Card, CardItem, Input, Left, Body, Button, Spinner, Item, Header, InputGroup } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import { getCurrentLocation, emailChanged, passwordChanged, loginUser, buildBusMap, getBusList, logoutUser, getRickshawList } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {

  constructor(props){
    super(props)
    this.props.logoutUser();
  }
  componentWillMount() {
    this.props.getCurrentLocation();
    this.props.getBusList();
    this.props.getRickshawList();
    this.props.buildBusMap();
  }


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner color="green" />;
    }
    return (
      <Button full light onPress={this.onButtonPress.bind(this)}>
        <Text style={{ color: 'black' }}>Log In</Text>
      </Button>
    );
  }


  render() {
    return (

      <Container style={{ justifyContent: 'center' }} >

        <Header style={{ backgroundColor: 'black', height: 5 }} androidStatusBarColor='black'>
        </Header>
        <Image style={{ alignItems: 'center', alignSelf: 'center', resizeMode: 'contain', height: 300, width: 500 }} source={require('../Images/ProRoutePlanner.jpg')} />

        <Content>
          <Card>
            <CardItem>
              <Item>
                <Icon name='user' />
                <InputGroup>
                  <Input
                    label="Username"
                    placeholder="salal786"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                  />
                </InputGroup>
              </Item>

            </CardItem>
            <CardItem>
              <Item>
                <Icon name='lock' />
                <InputGroup>
                  <Input
                    secureTextEntry
                    label="Password"
                    placeholder="******"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </InputGroup>
              </Item>
            </CardItem>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
          </Card>
          <View>
            {this.renderButton()}

            <Button full dark onPress={() => Actions.registermain()}>
              <Text style={{ color: 'white' }}>Register</Text>
            </Button>
          </View>
        </Content>

      </Container>

    );


  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};



export default connect(mapStateToProps, {
  buildBusMap, emailChanged, passwordChanged, loginUser, getBusList, logoutUser, getRickshawList, getCurrentLocation
})(LoginForm);
