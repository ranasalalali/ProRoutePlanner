import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button, Content, Right, List, ListItem, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from '../MapContainer';
import SideBar from '../SideBar';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { resetAddRickshaw, getRickshawList, RickshawInput, getcurrentrickshawcoords } from '../../actions';
class AdminRickshawMain extends Component {

  componentWillMount() {
    this.props.getRickshawList();
  }
  onRickshawPress(rickshaw) {
    this.props.RickshawInput(rickshaw);
    this.props.getcurrentrickshawcoords();
    Actions.rickshawwaypoints();
  }

  RickshawList() {
    var Items = this.props.rickshawlist;
    return (
      <Content scrollenabled={true}>
        <List dataArray={Items}
          renderRow={(item) =>
            <ListItem onPress={() => this.onRickshawPress(item)}>
              <Body>
                <Text>{item}</Text>
              </Body>
              <Right>
                <Icon name='car' style={{ color: 'black' }} />
              </Right>
            </ListItem>
          }>
        </List>
      </Content>
    )
  }



  render() {
    AddRickshaw = () => {
      this.props.resetAddRickshaw();
      Actions.addrickshaw();
    }

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => closeDrawer()}
      >

        <Container>
          <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
            <Left>
              <Button transparent onPress={() => {
                Actions.adminmain()
              }}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: 'white' }}>Rickshaw List</Text>
            </Body>
            <Right>
              <Button transparent onPress={() => AddRickshaw()}>
                <Icon name='add' />
              </Button>
            </Right>
          </Header>
          {this.RickshawList()}
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { rickshawname, rickshawerror, rickshawadded, rickshawlist } = auth;
  return { rickshawname, rickshawerror, rickshawadded, rickshawlist };
};

export default connect(mapStateToProps, { resetAddRickshaw, getRickshawList, RickshawInput, getcurrentrickshawcoords })(AdminRickshawMain);
