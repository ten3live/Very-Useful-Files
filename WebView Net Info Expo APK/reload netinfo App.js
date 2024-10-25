import React,{Component} from "react";
import { render } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  BackHandler
 } from "react-native";
import { WebView } from "react-native-webview";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare,faRedo ,faAngleLeft,faAngleRight,faPowerOff  } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare,faRedo,faAngleLeft,faPowerOff , faAngleRight)


export default WebViewUI;


function WebViewUI(props) {
  const webviewRef = React.useRef(null);

  function webViewgoback() {
    if (webviewRef.current) webviewRef.current.goBack();
  }


  function webViewgoRefresh() {
    if (webviewRef.current) BackHandler.exitApp()
 
  }

  function webViewNext() {
    if (webviewRef.current) webviewRef.current.goForward();
  }

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        renderLoading="true"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

 
  return (
    <>

       
<WebView
  source={{ uri: "https://realsau.com/home.php" }}
  renderLoading={LoadingIndicatorView}
  scalesPageToFit={false}
  startInLoadingState={true}
  ref={webviewRef}
/>
 
<View style={styles.tabBarContainer}>
  <TouchableOpacity style={{paddingLeft:30,paddingRight:30}}onPress={webViewgoback}>
    <FontAwesomeIcon icon="angle-left" size={30} color={"white"} />
  </TouchableOpacity>
  <TouchableOpacity style={{paddingLeft:30,paddingRight:30}} onPress={webViewgoRefresh}>
    <FontAwesomeIcon icon="power-off"size={20} color={"white"} />
  </TouchableOpacity>
    <TouchableOpacity style={{paddingLeft:30,paddingRight:30}} onPress={webViewNext}>
    <FontAwesomeIcon icon="angle-right"size={30} color={"white"} />
  </TouchableOpacity>
  </View>

         </>
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: "black",
    height: 45,
  
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: "#ef4771",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
