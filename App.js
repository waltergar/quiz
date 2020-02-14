import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Terms from './src/components/screen/Absoulte';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import configureStore from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';
import OneSignal from 'react-native-onesignal';

const store = configureStore();

const persistor = persistStore(store)

class App extends React.Component {
  componentDidMount() {
    OneSignal.init("8c0be711-2536-4786-808c-41626c3721f8");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) { }
  onOpened(openResult) { }
  onIds(device) { }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Terms />
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <AppNavigator />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default App;


