import React from 'react';
import { View } from 'react-native';
import { SecureStore } from 'expo';
import { Icon } from 'react-native-elements';
import styles from '../../../styles';
import Axios from 'axios';

export default class AppLoading extends React.Component {
  constructor(props) {
    super(props);
    this.isLogin();
  }

  async isLogin() {
    // const userToken = await SecureStore.getItemAsync('userToken');
    // Axios.get("http://10.34.5.254/api/snaps", {
    //   headers: { token: userToken }
    // }).then(res => {
    //   this.props.navigation.navigate(res.data ? 'App' : 'Auth');
    // }).catch(error => {
    //   SecureStore.deleteItemAsync('userToken');
    //   this.props.navigation.navigate('Auth');
    // });
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View style={ styles.containerCenter }>
        <Icon
          name='hourglass'
          type='font-awesome'
          size={50}
          color='#363636'
        />
      </View>
    );
  }
}