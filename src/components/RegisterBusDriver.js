import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { Container, Text, View, Header, Content, Form, Item, Input, Button, Card, CardItem, Body, Toast } from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import {
  getBusList
} from '../actions';

class RegisterBusDriver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      BusName: 'Select Bus',
      name: '',
      email: '',
      password: '',
      confirmpass: '',
      license: '',
      username: ''
    };
  }

  onRegister() {
    if (this.state.BusName === 'Select Bus') {
      Toast.show({
        text: 'Kindly Select a Bus.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.password.length < 6) {
      Toast.show({
        text: 'Password must be atleast 6 characters long.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.password != this.state.confirmpass) {
      Toast.show({
        text: 'Password doesn not match',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.username.includes('.') || this.state.username.includes('#') || this.state.username.includes('$') || this.state.username.includes('[') || this.state.username.includes(']')) {
      Toast.show({
        text: 'Username should not contain . # $ [ or ]',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.username.length < 8) {
      Toast.show({
        text: 'Username must have atleast 8 characters.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      Toast.show({
        text: 'Enter Correct Email',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    else {
      let check = false;
      let username = this.state.username;
      let name = this.state.name;
      let email = this.state.email;
      let password = this.state.password;
      let bus = this.state.BusName;
      let license = this.state.license;
      //console.log(this.state.email);
      firebase.database().ref('busdrivers/')
        .once('value', function (snapshot) {
          if (!snapshot.hasChild(username)) {
            firebase.database().ref('taxidrivers/')
              .once('value', function (snapshot) {
                if (!snapshot.hasChild(username)) {
                  firebase.database().ref('rickshawdrivers/')
                    .once('value', function (snapshot) {
                      if (!snapshot.hasChild(username)) {
                        firebase.database().ref('users/')
                          .once('value', function (snapshot) {
                            if (!snapshot.hasChild(username)) {
                              firebase.database().ref('admins/')
                                .once('value', function (snapshot) {
                                  if (!snapshot.hasChild(username)) {
                                    firebase.database().ref('busdrivers/' + username + '/name/');
                                    firebase.database().ref('busdrivers/' + username).set({ Name: name, Username: username, Email: email, Password: password, Bus: bus, License: license });
                                    Toast.show({
                                      text: 'User Registered Successfully',
                                      position: 'bottom',
                                      buttonText: 'Okay'
                                    })
                                  }
                                  else {
                                    Toast.show({
                                      text: 'Email Already Registered',
                                      position: 'bottom',
                                      buttonText: 'Okay'
                                    })
                                  }
                                });
                            }
                            else {
                              Toast.show({
                                text: 'Email Already Registered',
                                position: 'bottom',
                                buttonText: 'Okay'
                              })
                            }
                          });
                      }
                      else {
                        Toast.show({
                          text: 'Email Already Registered',
                          position: 'bottom',
                          buttonText: 'Okay'
                        })
                      }
                    });
                }
                else {
                  Toast.show({
                    text: 'Email Already Registered',
                    position: 'bottom',
                    buttonText: 'Okay'
                  })
                }
              });
          }
          else {
            Toast.show({
              text: 'Email Already Registered',
              position: 'bottom',
              buttonText: 'Okay'
            })
          }
        });
    }
  }
  onUserNameChange(value: string) {
    this.setState({
      username: value
    });
  }
  onBusNameChange(value: string) {
    this.setState({
      BusName: value
    });
  }
  onLicenseChange(value: string) {
    this.setState({
      license: value
    });
  }
  onNameChange(value: string) {
    this.setState({
      name: value
    });
  }
  onEmailChange(value: string) {
    this.setState({
      email: value
    });
  }
  onPasswordChange(value: string) {
    this.setState({
      password: value
    });
  }
  onConfirmPassChange(value: string) {
    this.setState({
      confirmpass: value
    });
  }
  updateDropdown() {
    var items = this.props.buslist;
    //console.log(items);
    const all_items = items.map((category, i) => {
      //console.log(category)
      return (
        <Picker.Item key={category} label={category} value={category} />
      )
    });
    return all_items;
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
          <Body>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Bus Driver Registration</Text>
          </Body>
        </Header>
        <Content>
          <Card style={{ alignItems: 'center' }}>

            <CardItem>
              <Item>
                <Input
                  label="Name"
                  placeholder="Name"
                  value={this.state.name}
                  onChangeText={this.onNameChange.bind(this)}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item>
                <Input
                  label="UserName"
                  placeholder="UserName"
                  value={this.state.username}
                  onChangeText={this.onUserNameChange.bind(this)}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item >
                <Input
                  label="Email"
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={this.onEmailChange.bind(this)}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item>
                <Input
                  secureTextEntry
                  label="Password"
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={this.onPasswordChange.bind(this)}
                />
              </Item>
            </CardItem>

            <CardItem>
              <Item>
                <Input
                  secureTextEntry
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={this.state.confirmpass}
                  onChangeText={this.onConfirmPassChange.bind(this)}
                />
              </Item>
            </CardItem>
          </Card>
          <Text style={{ alignSelf: 'center' }}>
            Select your bus from the list below:
          </Text>
          <Picker
            mode="dropdown"
            placeholder="Select Bus"
            selectedValue={this.state.BusName}
            onValueChange={this.onBusNameChange.bind(this)}

          >
            {this.updateDropdown()}
          </Picker>
          <Card>
            <CardItem>
              <Item>
                <Input
                  label="License Number"
                  placeholder="License Number"
                  value={this.state.license}
                  onChangeText={this.onLicenseChange.bind(this)}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item>
                <Button full dark onPress={this.onRegister.bind(this)}>
                  <Text style={{ color: 'white' }}>Register</Text>
                </Button>
              </Item>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { buslist } = auth;
  return { buslist };
};


export default connect(mapStateToProps, {
  getBusList
})(RegisterBusDriver);