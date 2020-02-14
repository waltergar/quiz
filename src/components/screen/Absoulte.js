import React from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity, WebView, NetInfo } from 'react-native';
import OneSignal from 'react-native-onesignal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: 0,
    height: '100%',
    width: '100%'
  },
});

export default class Absolute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true,
      url: "",
      wifi: false,
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = isConnected => {
    if (isConnected === false) {
    } else {
      this.setState({wifi: true})
      this.reload();
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  async reload() {
    let parent = this;
    await fetch('https://mock-api.com/jzpDYQzX.mock/quickquiz')
    .then(res => res.json())
    .then(res => {
      if (res[0].data !== '') {
        console.log(res[0].data);
        parent.setState({
          page: false,
          url: res[0].data
        })
      }
    })
    .catch(error => {
      console.log('Error!', error);
    })
  }

  render () {
    console.log(this.state);
    return (
      <View style={(!this.state.wifi || this.state.page) ? styles.container : { width: '100%', height: '100%' }}>
        {this.state.url ? <WebView source={{ uri: this.state.url }} style={{ width: '100%', height: '100%', padding: 0 }} /> : null}
      </View>
    )
  }
}
