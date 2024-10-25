//Function
import React, { useState } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';

const MyComponent = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
  ]);

  const onRefresh = () => {
    // Set refreshing to true to show the refresh indicator
    setRefreshing(true);

    // Simulate an API call or data fetch
    setTimeout(() => {
      setData([
        { id: 5, name: 'Peter' },
        { id: 6, name: 'Mary' },
        ...data,
      ]);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data.map((item) => (
        <View key={item.id} style={{ padding: 10 }}>
          <Text>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyComponent;



// Class
import React, { Component } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
        { id: 4, name: 'Alice' },
      ],
    };
  }

  onRefresh = () => {
    // Set refreshing to true to show the refresh indicator
    this.setState({ refreshing: true });

    // Simulate an API call or data fetch
    setTimeout(() => {
      const { data } = this.state;
      this.setState({
        data: [
          { id: 5, name: 'Peter' },
          { id: 6, name: 'Mary' },
          ...data,
        ],
        refreshing: false,
      });
    }, 2000);
  };

  render() {
    const { refreshing, data } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        {data.map((item) => (
          <View key={item.id} style={{ padding: 10 }}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default MyComponent;
