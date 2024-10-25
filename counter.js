import React from 'react';
import {useState} from 'react';
import { StatusBar,Button,TextInput,StyleSheet, Text, View } from 'react-native';
export default function App() {
const [state, setState] = useState(0);
const add=()=>{
  return(
     setState(state+1)
    )};
const minus=()=>{
      return(
         setState(state-1)
        )};
const reset=()=>{
          return(
             setState(0)
            )};
    
        
    return (
   <>
   <StatusBar style="auto"/>
   <Text style={styles.header}>Counter</Text>
   <View style={styles.container}>
      <Text style={styles.counter}>{state}</Text>
      {/* <TextInput style={styles.TextInput}className="name"placeholder="User Name"/>
      <TextInput style={styles.TextInput}className="email"placeholder="Email "/>
      <TextInput style={styles.TextInput}className="password"placeholder="Password"/> */}
        <Text onPress={add} style={styles.button}title="+">+</Text>
      <Text onPress={minus} style={styles.button}title="-">-</Text>
      <Text onPress={reset} style={styles.button}title="Reset">Reset</Text>
 
        </View>
       <Text style={styles.footer}>CopyRight@SajjadSolangi</Text>
  </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    fontSize:40,
    textAlign:"center",
    alignItems:'center',
    justifyContent:"center",
    color:'#ddd',   
  },

  counter: {
    marginBottom:60,
    fontSize:150,
    textAlign:"center",
    alignItems:'center',
    justifyContent:"center",
    color:'#111',   
  },
  container: {
    flex: 1,
     backgroundColor: '#ddd',
    paddingHorizontal:50,
  },
button: {
  fontSize:40,
 backgroundColor:"black",
 marginTop:20,
 color:'#ddd',
 borderRadius:50,
  textAlign:"center",
  alignItems:'center',
  justifyContent:"center",
  
  },
  TextInput: {
    fontSize:30,
    color:"white",
    backgroundColor:'#999',
    borderRadius:50,
    paddingHorizontal:50,
    marginBottom:20,
   },
  footer: {
    backgroundColor: '#333',
    fontSize:20,
    textAlign:"center",
    alignItems:'center',
    justifyContent:"center",
    color:'#ddd',   
  },
});
