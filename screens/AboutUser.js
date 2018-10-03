import React from 'react';

import {Container,Content, Card, CardItem, Text,Body,Button, Icon} from 'native-base';



import Header from '../components/Header';
import Footer from '../components/Footer';

export default class AboutUser extends React.Component {


  render() {
    const {navigation}=this.props;

    return (
      <Container>
        <Header title="AboutUser"/>


        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>User name: {this.props.navigation.state.params.name}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                User email: {this.props.navigation.state.params.email}
              </Text>
              </Body>
              <Body>
              <Text>
                Body: {this.props.navigation.state.params.body}
              </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>User Id: {this.props.navigation.state.params.id}</Text>
            </CardItem>

          </Card>

        </Content>
        <Footer navigation={this.props.navigation}/>
      </Container>
    );
  }
}


