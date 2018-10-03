import React, { Component } from 'react';
import {StyleSheet} from "react-native";
import { Container, Header, Item, Text, Input, Icon, Button } from 'native-base';
export default class SearchBar extends Component {

  searchValue = '';

  render() {
    return (
        <Header style={styles.search} searchBar rounded onChangeText={this.props.search}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(val) => this.searchValue = val} />
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={() => this.props.onSearch(this.searchValue)}>
            <Text >Search</Text>
          </Button>
        </Header>

    );
  }
}

const styles = StyleSheet.create({
  search:{
    paddingTop: 0,
  }
});