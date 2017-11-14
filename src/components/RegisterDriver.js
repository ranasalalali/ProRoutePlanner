import React, { Component } from 'react';
import {Text} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
export default class RegisterDriver extends Component {
  render() {

    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>

            <Item>
              <Input placeholder="Password" />
            </Item>

          </Form>
          <Button full info>
            <Text>Info</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
