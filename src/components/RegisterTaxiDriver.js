import React, { Component } from 'react';
import {StyleSheet,Picker} from 'react-native';
import { Container,Text,View, Header, Content, Form, Item, Input, Button,Card,CardItem,Body } from 'native-base';
import { connect } from 'react-redux';
import {  getBusList
} from '../actions';

class RegisterTaxiDriver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: 'Select Bus'
    };
  }

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  updateDropdown(){
      var items = this.props.buslist;
      console.log(items);
      const all_items = items.map((category, i) => {
        console.log(category)
        return (
            <Picker.Item key={category} label={category} value={category} />
          )
       });
       return all_items;
     }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'black'}} androidStatusBarColor='black'>
        <Body>
          <Text style={{color:'white',alignSelf:'center'}}>Taxi Driver Registration</Text>
        </Body>
        </Header>
        <Content>
        <Card style={{alignItems:'center'}}>
          
            <CardItem>
                <Item>
                  <Input
                    label="Name"
                    placeholder="Name"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item >
                  <Input
                    label="Email"
                    placeholder="Email"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item>
                  <Input
                    label="Password"
                    placeholder="Password"
                  />
                </Item>
            </CardItem>
            
            <CardItem>
                <Item>
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item>
                  <Input
                    label="License Number"
                    placeholder="License Number"
                  />
                </Item>
            </CardItem>
            <CardItem>
                <Item>
                <Button full dark>
                  <Text style={{color:'white'}}>Register</Text>
                </Button>
                </Item>
            </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {buslist} = auth;
  return{buslist};
};


export default connect(mapStateToProps, {
  getBusList
})(RegisterTaxiDriver);