import { useNetInfo } from "@react-native-community/netinfo";
import Constants from "expo-constants";

import React, { useEffect, useRef } from "react";

import {
  StatusBar,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
  Image,
  Linking,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [webViewHeight, setWebViewHeight] = React.useState(null);

  const webview = useRef(null);
  const canGoBackRef = useRef(false);
  const onAndroidBackPress = () => {
    if (canGoBackRef.current && webview.current) {
      webview.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []);
  const onNavigationStateChange = ({ canGoBack }) => {
    canGoBackRef.current = canGoBack;
  };

  const onMessage = (event) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const onShouldStartLoadWithRequest = (request) => {
    if (request.navigationType === "click") {
      // Open all new click-throughs in external browser.
      Linking.openURL(request.url);
      return false;
    }
    return true;
  };

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  const netInfo = useNetInfo();

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  var defaultRenderError = function (errorDomain, errorCode, errorDesc) {
    return (
      <View style={styles.loadingOrErrorView}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>Hi There is Error</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1, height: styles.header.height }}
      >
        <WebView
          source={{ uri: "https://realsau.com" }}
          bounces={true}
          scrollEnabled={false}
          onMessage={onMessage}
          injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
          javaScriptEnabled
          renderError={defaultRenderError}
          domStorageEnabled
          startInLoadingState
          ref={webview}
          style={styles.content}
          onNavigationStateChange={onNavigationStateChange}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOrErrorView: {
    paddingLeft: 70,
    color: "white",
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  header: {
    height: 300,
    justifyContent: "center",
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
