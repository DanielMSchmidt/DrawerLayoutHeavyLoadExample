'use strict';

var React = require('react-native');
var { View, Text, StyleSheet, TouchableHighlight, TextInput, Image, InteractionManager } = React;
var DrawerLayout = require('react-native-drawer-layout');

function increaseCounter() {
  setTimeout(function() {
    this.setState({
      counter: this.state.counter + 1
    });
    increaseCounter.call(this);
  }.bind(this), 100);
}

function doExpensiveOperation() {
  var i;
  for (i = 0; i < Math.pow(2, 23); i++) {
    i * i;
  }
}

var DrawerLayoutExample = React.createClass({

  componentWillMount() {
    increaseCounter.call(this);
  },

  getInitialState() {
    return {
      counter: 0,
    };
  },

  render: function() {
    var navigationView = (
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <Text>Hello there!</Text>
        <Image style={{
          height: 200, 
          width: 200, 
          transform: [{
            rotateX: ('' + this.state.counter + 'deg')
          }]
          }} source={{uri: 'http://placekitten.com/801/800' }} />
        <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
          <Text>Close drawer</Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <DrawerLayout
        onDrawerSlide={e => {
          this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)});
          InteractionManager.runAfterInteractions(doExpensiveOperation);
        }}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={300}
        ref={(drawer) => { return this.drawer = drawer  }}
        keyboardDismissMode="on-drag"
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Content!</Text>
          <Text>{this.state.drawerStateChangedOutput}</Text>
          <Text>{this.state.drawerSlideOutput}</Text>
          <Text>{this.state.counter}</Text>
        </View>
      </DrawerLayout>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputField: {
    backgroundColor: '#F2F2F2',
    height: 40,
  },
});

module.exports = DrawerLayoutExample;
