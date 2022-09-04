
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Button,Input,Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        navigation.replace('Home');
      }
    });
   return unsuscribe;
  }, []);

  const signin = () =>{
auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error));
  };
  return (
 <KeyboardAvoidingView behavior="padding"  style={styles.container}>
   <StatusBar style="light"/>
   <Image source={{
     uri: "https://firebasestorage.googleapis.com/v0/b/signal-clone-fc7ca.appspot.com/o/signal.png?alt=media&token=a315dffc-9009-44f8-ac0d-960b05d9c016",
   }}
   style={{width: 200,height:200}} />
   <View style={styles.inputContainer}>
     <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
     <Input placeholder="Password" onSubmitEditing={signin} secureTextEntry type="password"  value={password} onChangeText={(text) => setPassword(text)}/>
   </View>
   <Button containerStyle={styles.button} onPress={signin} title="Login"/>
   <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register"/>
    </KeyboardAvoidingView>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
flex: 1,
alignItems: "center",
justifyContent: "flex-start",
backgroundColor: "white",
padding: 10,
  },
  inputContainer: {
    width: 320,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
