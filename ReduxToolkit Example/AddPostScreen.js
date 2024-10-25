import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';

export default function AddPostScreen({ navigation }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    dispatch(addPost({ title, content }));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Add Post
      </Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16 }}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, height: 200 }}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4, marginTop: 16 }}
        onPress={handleSave}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
