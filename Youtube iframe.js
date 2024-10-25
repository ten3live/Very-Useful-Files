// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import CartProvider from './CartProvider';
// import {StackNavigator} from './Navigator';
// const linking = {
//   prefixes: ['alphaapp://'],
// };
// export default function App() {
//   return (
//     <CartProvider>
//       <NavigationContainer linking={linking}>
//         <StackNavigator />
//       </NavigationContainer>
//     </CartProvider>
//   );
// }

import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Platform,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';

const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator />
    </View>
  );
};
const Error = ({retryHandler}) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Text style={styles.paragraph}>
        Ops! Something went wrong while loading content.
      </Text>
      <Button
        title="Retry"
        onPress={() => {
          retryHandler();
        }}
      />
    </View>
  );
};
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
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleAndroidBackPress,
        );
      }
    };
  }, [canGoBack]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = ({nativeEvent}) => {
    setIsLoading(nativeEvent.loading);
    setCanGoBack(nativeEvent.canGoBack);
  };

  const handleRetry = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };
  const playerRef = useRef(null);

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer
        ref={playerRef}
        height={300}
        play={false}
        playList={'PLvN7nvnjkvpQribRyQ4r0FYZxKsPLGciy'}
        // videoId={'tCXGJQYZ9JA'}
        onChangeState={event => console.log(event)}
        onReady={() => console.log('ready')}
        onError={e => console.log(e)}
        onPlaybackQualityChange={q => console.log(q)}
        volume={50}
        playbackRate={1}
        playerParams={{
          cc_lang_pref: 'us',
          showClosedCaptions: true,
        }}
      />
      {/* <WebView
        ref={webViewRef}
        source={{uri: 'https://www.google.com.pk'}}
        style={{marginTop: 0}}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        renderError={() => <Error retryHandler={handleRetry} />}
        onNavigationStateChange={({canGoBack}) => setCanGoBack(canGoBack)}
      />
      {isLoading && <Loader />} */}
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
  },
});
export default App;
