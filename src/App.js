import React from 'react';
import { AppLoading, Font } from 'expo';

// Components
import AppNavigator from './navigation/navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}