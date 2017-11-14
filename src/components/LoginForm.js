import React, {Component} from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import { Container, Content,Card, CardItem, Input, Button, Spinner,Item } from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';

class LoginForm extends Component {

  onEmailChange(text){
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  onButtonPress(){
    const { email, password } = this.props;

    this.props.loginUser ({email,password});
  }


  renderButton(){
    if(this.props.loading){
      return <Spinner color="green"/>;
    }
    return (
        <Button full rounded info onPress={this.onButtonPress.bind(this)}>
          <Text style={{color:'white'}}>Log In</Text>
        </Button>
    );
  }


  render(){
      return(
        <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <Content>
        <Card>
          <CardItem>
              <Item rounded>
                <Input
                  label="Email"
                  placeholder="user@gmail.com"
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                />
              </Item>
          </CardItem>
          <CardItem>
              <Item rounded>
                <Input
                  secureTextEntry
                  label="Password"
                  placeholder="password"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </Item>
          </CardItem>
                <Text style={styles.errorTextStyle}>
                  {this.props.error}
                </Text>
        </Card>
            {this.renderButton()}

            <Button full rounded primary onPress={()=>Actions.registermain()}>
              <Text style={{color:'white'}}>Register</Text>
            </Button>
        </Content>
        </Container>

      );


    }
}

const styles = {
  errorTextStyle:{
    fontSize: 15,
    alignSelf: 'center',
    color:'red'
  }
};

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading} = auth;
  return{email, password, error, loading};
};



export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
