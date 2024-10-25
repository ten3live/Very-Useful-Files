import React, { useEffect,useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,RefreshControl,Modal ,TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost,editPost } from './postsSlice';
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeScreen({ navigation }) {
  const netInfo = useNetInfo();
  // console.log('Rechable',netInfo.isInternetReachable) //Internet /GB/MB 
  // console.log('Connected',netInfo.isConnected) //Sim /Wifi
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
 
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const fun2 = (post) => {
    setInputValue(post._id);
    setModalVisible(true);
    setTitle(post.title);
    setContent(post.content);
  };
  const handleUpdatePost = (item) => {
    dispatch(editPost({ id: inputValue, title, content }));
    setModalVisible(false);
    setTitle("");
    setContent("");
  };

  const [refreshing, setRefreshing] = useState(false);
  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };
  const onRefresh = () => {
    // Set refreshing to true to show the refresh indicator
    setRefreshing(true);

    // Simulate an API call or data fetch
    setTimeout(() => {
    //Do Something
    dispatch(fetchPosts());
      setRefreshing(false);
    }, 1000);
  };
  
  useEffect(() => {
    dispatch(fetchPosts());
  //   setTimeout(() => {
  //   onRefresh()
  // }, 1000);
  },[dispatch,modalVisible]);
  useEffect(() => {
    dispatch(fetchPosts());
    setTimeout(() => {
    onRefresh()
  }, 1000);
  },[netInfo.isInternetReachable]);
 
  
  
  const renderItem = ({ item }) => (<>
     <TouchableOpacity onPress={() => handleDeletePost(item._id)}><Text>Delete</Text></TouchableOpacity>
     <TouchableOpacity
      style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'gray' }}
      onPress={() => navigation.navigate('EditPost', { id: item._id, title: item.title, content: item.content })}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{item.title}</Text>
      <Text style={{ color: 'gray' }}>{item.content}</Text>
    </TouchableOpacity>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{height:100,backgroundColor:'white',opacity:0.8,flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter a value"
            value={title}
            onChangeText={text => setTitle(text)}
            style={{ width: '80%', borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Enter a value"
            value={content}
            onChangeText={text => setContent(text)}
            style={{ width: '80%', borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
          />
          <TouchableOpacity
            onPress={()=>handleUpdatePost(item)}
            style={{ backgroundColor: 'blue', padding: 10, marginTop: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{ backgroundColor: 'red', padding: 10, marginTop: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
       onPress={() => {
        fun2(item);
      }}
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Update Post</Text>
      </TouchableOpacity>
    
    </>
  );

  return (
    <View style={{ flex: 1, padding: 16 }} >
      {netInfo.isInternetReachable ? <View style={{height:50,width:'100%',backgroundColor:'green',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:40,color:'white'}}>Online</Text></View>:<View style={{height:50,width:'100%',backgroundColor:'red',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:40,color:'white'}}>Offline</Text></View>}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No posts found</Text>}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4, marginTop: 16 }}
        onPress={() => navigation.navigate('AddPost')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
}