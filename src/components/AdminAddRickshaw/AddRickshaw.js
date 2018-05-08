import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Card, CardItem, Item, Input, Container, Text, Button, Content, Right, List, ListItem, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from '../MapContainer';
import SideBar from '../SideBar';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AddNewRickshaw, RickshawInput, getRickshawWaypointList } from '../../actions'

class AddRickshaw extends Component {

  componentWillMount() {
    this.props.getRickshawWaypointList();
  }

  onRickshawNameChange(text) {
    this.props.RickshawInput(text);
  }

  onAddPress() {
    const { rickshawname } = this.props;
    this.props.AddNewRickshaw(rickshawname);
  }

  listorbutton() {
    if (this.props.rickshawadded && this.props.rickshawstartadded && this.props.rickshawendadded) {
      var Items = this.props.rickshawwaypointlist;
      return (
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
          <Button full dark onPress={() => Actions.rickshawcoordmap()}>
            <Icon name='add' />
            <Text>Add New Waypoint</Text>
          </Button>
        </View>
      )
    }
    else {
      return (
        <Button full dark onPress={this.onAddPress.bind(this)}>
          <Text>NEXT</Text>
        </Button>
      )
    }
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
            <Text style={{ color: 'white' }}>Add New Rickshaw</Text>
          </Body>
        </Header>
        <Card>
          <CardItem>
            <Item>
              <Input
                label="RickshawName"
                placeholder="Enter Rickshaw Name"
                onChangeText={this.onRickshawNameChange.bind(this)}
                value={this.props.rickshawname}
              />
            </Item>
          </CardItem>
          <Text style={styles.errorTextStyle}>
            {this.props.rickshawerror}
          </Text>
          {this.listorbutton()}

        </Card>
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

export default connect(mapStateToProps, { AddNewRickshaw, RickshawInput, getRickshawWaypointList })(AddRickshaw);