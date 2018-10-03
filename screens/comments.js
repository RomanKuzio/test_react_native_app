  import React from 'react';
import axios from 'axios';
import Modal from "react-native-modal";
import { Alert, StyleSheet, View } from "react-native";
import { Content, Container,Body, Text,List, ListItem, Input ,Form, Item, Icon,Button} from 'native-base';
import { ImagePicker, Permissions,Font } from 'expo';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from "./searchBar";
import AboutUser from "./AboutUser";



export default class Comments extends React.Component {
  constructor(props){
    super(props);
      this.onChange.bind(this);
      this.state = {
        comments: [],
        input: '',
        name: '',
        email: '',
        id: 0,
        postId: 0,
        body:'',
        isModalVisible: false,
        loading: false,
      };

  }

  componentDidMount() {
    this.loadComments();

  }



  loadComments = async () => {
    const responce = await axios.get('https://jsonplaceholder.typicode.com/comments');
    this.setState({
      comments: responce.data,
    });

  };


  _toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }


  onChange(text) {
    this.setState({
      input: text,
    })
  };

  UpdateInfo(text,field) {
    if (field === 'name') {
      this.setState({
        name: text,
      })

    } else {
      if (field === "email") {
        this.setState({
          email: text,
        })
      } else {
        if (field === "id") {
          this.setState({
            id: text,
          })
        } else {
          if (field === "postId") {
            this.setState({
              postId: text,
            })
          } else {
            if (field === "body") {
              this.setState({
                body: text,
              })
            }
          }
        }
      }
    }
  }

  submit = async()=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false){
      Alert.alert('Помилка','Некоректний e-mail')
    }else{
      let collection ={};
      collection.name=this.state.name;
      collection.email=this.state.email;
      collection.id=parseInt(this.state.id);
      collection.body=this.state.body;
      collection.postId=parseInt(this.state.postId);
      console.log(collection,"asd");
      await axios.post('https://jsonplaceholder.typicode.com/comments/post',
        {
          postId: collection.postId,
          id: collection.id,
          name: collection.name,
          email: collection.email,
          body: collection.body,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });}
        this._toggleModal()
  };

  get arrayWhithSearch(){
    if(this.state.input){
      return this.state.comments.filter((item) => item.name.indexOf(this.state.input) !== -1)
    }
    return this.state.comments;
  }



  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header title="Comments" />

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor:"white"}}>
            <View style={style.modalHeader}>
            <Text >Додати коментар</Text>
            </View>
              <Form>
              <Item>
                <Input onChangeText={(text)=>this.UpdateInfo(text,"name")} placeholder="Name" on/>
              </Item>
                <Item>
                  <Input onChangeText={(text)=>this.UpdateInfo(text,"email")} placeholder="Email" />
                </Item>
                <Item>
                  <Input onChangeText={(text)=>this.UpdateInfo(text,"id")} placeholder="Id" />
                </Item>
                <Item>
                  <Input onChangeText={(text)=>this.UpdateInfo(text,"body")} placeholder="Body" />
                </Item>
              <Item last>
                <Input onChangeText={(text)=>this.UpdateInfo(text,"postId")} placeholder="PostId" />
              </Item>
                <View style={{flex:1,justifyContent:"space-around",paddingTop:10, flexDirection:"row"}}>
              <Button onPress={()=>this.submit()} rounded info>
                <Text>Додати</Text>
              </Button>
                  <Button onPress={()=>this._toggleModal()} rounded info>
                    <Text>Назад</Text>
                  </Button>
                </View>
            </Form>
          </View>
        </Modal>
        <Content>
          <SearchBar onChangeText={(val)=>this.onChange(val)}/>


          <Button onPress={()=>this._toggleModal()} block info>
              <Text>Додати коментар</Text>
            </Button>
          <List dataArray={this.arrayWhithSearch}
            renderRow={(item) =>
              <ListItem active={this.props.navigation.state.routeName === 'AboutUser'} onPress={()=> navigation.navigate("AboutUser",(item))}>
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>{item.email}</Text>
                </Body>
              </ListItem>
            }>
          </List>

        </Content>
        <Footer navigation={this.props.navigation}/>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  modalHeader:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    paddingTop:10,


  }
});
