import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { Container, Text, View, Header, Content, Form, Item, Input, Button, Card, CardItem, Body, Toast } from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class RegisterTaxiDriver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpass: '',
      license: '',
      username: '',
      phone: ''
    };
  }

  onRegister() {
    if (this.state.password.length < 6) {
      Toast.show({
        text: 'Password must be atleast 6 characters long.',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    let reg = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    if (reg.test(this.state.phone) === false) {
      Toast.show({
        text: 'Enter Correct Email',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.phone.length)
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
    reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
      let license = this.state.license;
      let phone = this.state.phone;
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
                                    firebase.database().ref('taxidrivers/' + username + '/name/');
                                    firebase.database().ref('taxidrivers/' + username).set({ Name: name, Username: username, Email: email, Phone: phone, Password: password, License: license });
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
  onLicenseChange(value: string) {
    this.setState({
      license: value
    });
  }
  onPhoneChange(value: string) {
    this.setState({
      phone: value
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
              <Item >
                <Input
                  label="Phone"
                  placeholder="Phone"
                  value={this.state.phone}
                  onChangeText={this.onPhoneChange.bind(this)}
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


export default RegisterTaxiDriver;