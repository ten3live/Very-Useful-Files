import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from './postsSlice';

export default function EditPostScreen({ route, navigation }) {
  const { id } = route.params;
  const post = useSelector((state) => state.posts.find((p) => p._id === id));
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdatePost = () => {
    dispatch(editPost({ id: post._id, title, content }));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
        style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
        style={{ fontSize: 16, marginBottom: 16 }}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}
        onPress={handleUpdatePost}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Update Post</Text>
      </TouchableOpacity>
    </View>
  );
}
