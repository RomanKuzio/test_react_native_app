import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterOur extends React.Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical active={this.props.navigation.state.routeName === 'Comments'} onPress={() => this.props.navigation.navigate('Comments')}>
            <Icon name="navigate" />
            <Text>Comments</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button vertical active={this.props.navigation.state.routeName === 'MyProfile'} onPress={() => this.props.navigation.navigate('MyProfile')}>
            <Icon name="person" />
            <Text>My profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
