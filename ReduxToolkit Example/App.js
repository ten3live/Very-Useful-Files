import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import store from './store';
import HomeScreen from './HomeScreen';
import AddPostScreen from './AddPostScreen';
import EditPostScreen from './EditPostScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddPost" component={AddPostScreen} />
          <Stack.Screen name="EditPost" component={EditPostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>);
}
