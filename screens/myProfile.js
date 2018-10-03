import React from 'react';
import {Alert,TouchableOpacity, Image,View,AsyncStorage} from 'react-native'
import { Content, Container, Button,Form,Text, Item,Input ,Icon} from 'native-base';
import { ImagePicker, Permissions,Font } from 'expo';
import ls from 'react-native-local-storage';
import ValidationComponent from 'react-native-form-validator';


import Header from '../components/Header';
import Footer from '../components/Footer';

const options ={
  title: "my pic app",
  takePhotoButtonTitle: "take photo whith your camera",
  chooseFromLibraryButtonTitle: "take photo from your libary",
};
export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'avatarSource': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXK0eL////FzeDw8vfm6fHp7PPEzN/6+/zM0+PR1+bb4Ov29/rg5O7P1uXX3On8/P3wwrvxAAAE1ElEQVR4nO2d65aqMAxGIVxFwPd/25HLKCig0IR8rdlnnf+zV2mStmmNIsMwDMMwDMMwDMMwDMMwDMMwjHeI+v/Dv4C4O7VVnWZZlkzIsrqlEDwpqrJbvEZW+u5IVbJqN5BUUa79Vx6GyuyD3v9INl6OJJWfhm/q6KPil+M3ciu1/96dULXLr6P1axh3fKAPUn8U6XLAL/ZoMlJ9TPCeOfxQzPeFmBlXHxTpyBR8UGj/+Z9xE/Qga5DDJzqCrXg8yEy4aFts0TIIYud+FsE4rlAV6cpkiJr7WSbhSAGpWPIJYo4i3zfa02j7vMMTRx/g1ahU8BriDeL+Je8H0AbRtR5dQFvpBWIXjFNtpzkHl/Vb3LD2UdmnYYwWa1IBw1pbagZ/oAGLpswFzQDUrk2+frx0nBuSoUCyuINkyLX2xTVkXTlBGjbBGzIvncxQgfANJcpSLEPGbTYzVCJ8Q4nFE1ZdaoaHgNraN0Mz/FFDqF0MMzTDRaB2E83QDH/UEKpbQcZQ22qKGZrhjxpCHeSboRkugnSOTzKGMBm/TRLupraetEVp+Zaw+0fbrUfmVGYEYhRldvRHWm27jvANReLoP+F/peEbQvQnisZSiHteoobacj0yfRgjEH3CAg3QYIYyHV8DIMdPgoYgRxeChom2W08uaIixGcV+42kCxkaGwIWgB5W23ID7DfVVIMpS0cIUomgTTfkYyULoKkIHSMIXDDUYySISrL1h9oTFMqK22BOhJSLMEN4LN4mrazBxpkckYYAkwwGJcAr2uhn/MhiqBzqSuEQKFGYG2He+oWZhB3esAdm/mMBdnGKsfadw1zUQh04zuPOFts8CvOtgqHpmhLc2heq8HOHN+SBbUDN4t03hsmHEXNWAvU0zwlnVwGxfzOCsavCyYQdnzgeMpB18+QLzI+WMNdomq3C9cIKY7keYvlNtjQ0YHkqOAVf3UzimItoGzQsMKQPkzHAV52gDtom4gGNpA3UlbxnHqQgdZgZyt5mIuDB8wfH5Pcyae8YPGDoJwueKyAzN0AdDxwMMiOb8bcI3dGyo9eArdSy9zRAAx7WFB4aOTW4eGDqeI+LXpa5nwfCG5HqMiHNFfZna+TS/uCAr8nTSYtyTWYTt2XLUucjYb6KtsgJjqwLohhvjKTdey1cH509cYBpy/jwCpiFnTxTkKTfP0eEI5OEFb/cloiHvbWDEdMF8bUZbZwHmTna8dgz22wjaQu8wC+LNRPbba2ifaR74T1hSI3E7ryojkHGkVuwe8C3T39OgRvSprzi+VpoN0RTVgm9iPEgbpYEU/DpfudZ0uiRFqcSPOq6Tlac65ucN35PktKhDpXBwWeVaneBITS1yM/1LbtKb/lSdETu3kXSUeS14P0KOJPmU0F4EumypUQieWzCPI13A/O4ULV81l7ea0XOdgmkcCdSvh2HpgZAeNincynJ4v56iPlqyUnVube3AobWHH+P3ZO+U9Gj8Hlzb7x199Ov41pFav77PKckXQYcuwPnvCz6tk+HqzwNs1jqsB7mKrO0FkOjr6qdSLFU6dPE3wCzwfrITygf6oJg/j0Ktnxlwk2l2DG4AB56bHU1QM3DC2JdDoj/foEuvGFCOWKBTDHgEO1LZ3xRDIPK7zv6C4IfQDAPADP3nD3a9WfhUtRNMAAAAAElFTkSuQmCC",
      photoPermission: null,
      changeName: true,
      'name': "Введіть ім'я",
      'email': "Введіть e-mail"

    }
  }


  componentDidMount(){
    AsyncStorage.getItem('name').then((value)=>{if(value!==null){this.setState({ 'name': value})}else{this.state.name}});
    AsyncStorage.getItem('email').then((value)=>{if(value!==null){this.setState({ 'email': value})}else{this.state.email}});
    AsyncStorage.getItem('avatarSource').then((uri)=>{if(uri!==null){this.setState({ 'avatarSource': value})}else{this.state.avatarSource}});

  };


  selectImageFromGallery = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.05,
      aspect: [4, 3],
      exif: false
    });

    console.log(result);

    if (!result.cancelled) {
      AsyncStorage.setItem('avatarSource', result.uri);
      this.setState(
      {'avatarSource': result.uri}
      )
    }
  };

  selectImageFromCamera = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.05,
      aspect: [4, 3],
      exif: false
    });

    console.log(result);

    if (!result.cancelled) {
      AsyncStorage.setItem('avatarSource', 'result.uri');
      this.setState({'avatarSource': result.uri});
    }
  };

  changeName = async(text, field) => {
    /*let keys = ['name', 'email','avatarSource'];
    AsyncStorage.multiRemove(keys, (err) => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
  */
    this.setState({
      changeName: false,
    });
    if (field === 'name') {
      AsyncStorage.setItem('name', text);
      this.setState({
        'name': text,
      })

    } else {
      if (field === "email") {

        AsyncStorage.setItem('email', text);
        this.setState({
          'email': text,
        })
      }
    }


  };

  saveEdit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      Alert.alert('Помилка', 'Некоректний e-mail')
    } else {
      this.setState({changeName: true})
    }

  };

  state={
    isReady: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  renderName = () => {
    if (this.state.changeName) {
      return <View>
        <Text style={{fontSize: 21}}>Iм'я:</Text>
        <Text>{this.state.name}</Text>

        <Text style={{fontSize: 21}}>E-mail:</Text>
        <Text>{this.state.email}</Text>
      </View>
    } else {
      return (
        <Form>
          <Item>
            <Input onChangeText={(text) => this.changeName(text, "name")} placeholder="Ім'я" on/>
          </Item>
          <Item>
            <Input onChangeText={(text) => this.changeName(text, "email")} placeholder="E-mail"/>
          </Item>
          <View style={{flex: 1, padding: 10}}>
            <Button onPress={() => this.saveEdit()} title="addName" info rounded>
              <Text>Додати</Text>
            </Button>
            <View style={{paddingTop: 10}}>
              <Button onPress={() => this.setState({changeName: true})} title="addName" style={{paddingTop: 10}} info
                      rounded>
                <Text>Назад</Text>
              </Button>
            </View>
          </View>
        </Form>
      )
    }
  };




  render() {
    const avatar = this.state.avatarSource;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return(
      <Container>
        <Header title="My Profile"/>
        <Content>
          <View style={{flex: 1, display: "flex", flexDirection: "row"}}>
            <View style={{flex: 1, padding: 10, width: 290}}>
              {avatar && <Image source={{uri: avatar}} style={{width: 165, height: 200}}/>}
              <View style={{
                flex: 1,
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-around"
              }}>

                <Button onPress={this.selectImageFromCamera} title="addFromCamera">
                  <Icon name='camera'/>
                </Button>
                <Button onPress={this.selectImageFromGallery} title="addFromCamera">
                  <Icon name='film'/>
                </Button>
              </View>
            </View>
            <View style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingTop: 10,
              paddingLeft: 10
            }}>
              <TouchableOpacity onPress={this.changeName}>
                {this.renderName()}
              </TouchableOpacity>
            </View>
          </View>
        </Content>

        <Footer navigation={this.props.navigation}/>
      </Container>
    );
  }
}


