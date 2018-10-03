import { createSwitchNavigator } from 'react-navigation';

import Comments from '../screens/comments';
import MyProfile from '../screens/myProfile';
import AboutUser from '../screens/AboutUser';




export default createSwitchNavigator({
  Comments: Comments,
  MyProfile:  MyProfile ,
  AboutUser:  AboutUser,
}, {
  initialRouteName: 'MyProfile',
});