
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Platform,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text
} from 'react-native';
import { WebView } from 'react-native-webview';


const Loader=()=>{
  return(<View style={[StyleSheet.absoluteFill, styles.container]}>
  <ActivityIndicator/></View>)
}
const Error=({retryHandler})=>{
  return(<View style={[StyleSheet.absoluteFill, styles.container]}>
      <Text style={styles.paragraph}>
        Ops! Something went wrong while loading content.
      </Text>
      <Button title="Retry" onPress = {() => {retryHandler()}} />
    </View>)
}
const App = () => {
  
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleAndroidBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleAndroidBackPress);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleAndroidBackPress);
      }
    };
  }, [canGoBack]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = ({ nativeEvent }) => {
    setIsLoading(nativeEvent.loading);
    setCanGoBack(nativeEvent.canGoBack);
  };

  const handleRetry = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden/>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://ten3live.epizy.com' }}
        cacheEnabled={true}
        userAgent="demo-react-native-app"
        style={{ marginTop: 0 }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        renderError={() => <Error retryHandler={handleRetry} />}
        onNavigationStateChange={({ canGoBack }) => setCanGoBack(canGoBack)}
      />
      {isLoading && <Loader />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    fontSize: 16,
    color: 'white',
    opacity: 0.5,
    textAlign: 'center',
  }
});
export default App;
