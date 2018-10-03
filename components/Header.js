import React from 'react';
import {Alert,TouchableOpacity, Image,View} from 'react-native'
import { Header, L, Body, Title, Right } from 'native-base';

export default class HeaderOur extends React.Component {
  render() {
    return (
        <Header >
          <Body style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <Title >{this.props.title}</Title>
          </Body>
        </Header>
    );
  }
}
