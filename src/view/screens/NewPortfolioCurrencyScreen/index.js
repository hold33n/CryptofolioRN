import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NewPortfolioCurrencyScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') {
      // this is the event type for button presses
      if (event.id === 'closeNewPortfolioCurrency') {
        // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop({
          animated: true, // does the pop have transition animation or does it happen immediately (optional)
        });
      }
    }
  }

  render() {
    return (
      <View>
        <Text>Add new item flow</Text>
      </View>
    );
  }
}

export default NewPortfolioCurrencyScreen;
