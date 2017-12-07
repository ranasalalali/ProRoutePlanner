import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container,Text,View, Header, Content, Form, Item, Input, Button,Card,CardItem } from 'native-base';
import { connect } from 'react-redux';

class RegisterTaxiDriver extends Component {

  constructor(props) {
    super(props);
    this.state = {Route: false, Free: false};
  }

  onRouteButtonPress = () => {
    this.setState({
      Route: true,
      Free:false
    });
  }
  onFreeButtonPress = () => {
    this.setState({
      Route: false,
      Free: true
    });
  }

  Form(){
    if(this.state.Free)
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
                <Input
                  label="License Plate"
                  placeholder="XXX-XXX"
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
    if(this.state.Route)
      return(
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
              <Button full rounded info onPress={this.onRouteButtonPress}>
                <Text style={{color:'white'}}>Route Driver</Text>
              </Button>
              <Button full rounded info onPress={this.onFreeButtonPress}>
                <Text style={{color:'white'}}>Free Driver</Text>
              </Button>
            </CardItem>
          </Card>
          {this.Form()}
        </Content>
      </Container>
    );
  }
}

export default RegisterTaxiDriver;
