import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container,Text,View, Header, Content, Form, Item, Input, Button,Card,CardItem } from 'native-base';
import { connect } from 'react-redux';

class RegisterBusDriver extends Component {


  render() {
    return (
      <Container>
        <Content>
        <Card style={{alignItems:'center'}}>
          <CardItem>
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
                  <Input
                    label="License Plate"
                    placeholder="XXX-XXX"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item rounded>
                  <Input
                    label="Starting Point"
                    placeholder="Search from list"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item rounded>
                  <Input
                    label="Destination Point"
                    placeholder="Search from list"
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
          </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

export default RegisterBusDriver;
