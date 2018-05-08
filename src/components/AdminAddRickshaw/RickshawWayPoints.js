import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Card, CardItem, Item, Input, Container, Text, Button, Content, Right, List, ListItem, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from '../MapContainer';
import SideBar from '../SideBar';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AddNewRickshaw, RickshawInput, getRickshawWaypointList } from '../../actions'

class RickshawWayPoints extends Component {

  componentWillMount() {
    this.props.getRickshawWaypointList();
  }

  onRickshawNameChange(text) {
    this.props.RickshawInput(text);
  }

  onAddPress() {
    const { rickshaw } = this.props;
    this.props.AddNewRickshaw(rickshaw);
  }

  list() {
    var Items = this.props.rickshawwaypointlist;
    return (
      <Content scrollenabled={true}>
        <View>
          <List dataArray={Items}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text>{item}</Text>
                </Body>
                <Right>
                  <Icon name='pin' style={{ color: 'black' }} />
                </Right>
              </ListItem>
            }>
          </List>
        </View>
      </Content>
    )
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
          <Left>
            <Button transparent onPress={() => Actions.adminmain()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>{this.props.rickshawname}</Text>
          </Body>
        </Header>
        <Card>
          <CardItem>
            <Item>
              <Input
                disabled
                label="RickshawName"
                placeholder="Enter Rickshaw Name"
                onChangeText={this.onRickshawNameChange.bind(this)}
                value={"Rickshaw: " + this.props.rickshawname}
              />
            </Item>
          </CardItem>
          {this.list()}
        </Card>
        <Button full dark onPress={() => Actions.rickshawcoordmap()}>
          <Icon name='add' />
          <Text>Add New Waypoint</Text>
        </Button>
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
  const { rickshawname, rickshawerror, rickshawadded, rickshawwaypointlist, rickshawstartadded, rickshawendadded } = auth;
  return { rickshawname, rickshawerror, rickshawadded, rickshawwaypointlist, rickshawstartadded, rickshawendadded };
};

export default connect(mapStateToProps, { AddNewRickshaw, RickshawInput, getRickshawWaypointList })(RickshawWayPoints);
