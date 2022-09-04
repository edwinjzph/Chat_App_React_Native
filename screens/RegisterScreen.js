import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button,Input,Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: 
                imageUrl || 
                "https://firebasestorage.googleapis.com/v0/b/signal-clone-fc7ca.appspot.com/o/signal.png?alt=media&token=a315dffc-9009-44f8-ac0d-960b05d9c016",
            });
        })
        .catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding"  style={styles.container}>
              <StatusBar style="light"/>
            <Text h3 style={{marginBottom: 50}}>Create a signal account</Text>
            <View style={styles.inputContainer}>
<Input placeholder="Full name" autoFocus type='text' value={name} onChangeText={(text) => setName(text)}/>
<Input placeholder="Email"  type='text' value={email} onChangeText={(text) => setEmail(text)}/>
<Input placeholder="Password" secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)}/>
<Input onSubmitEditing={register} placeholder="Profile picture url(optional)"  type='text' value={imageUrl} onChangeText={(text) => setImageUrl(text)}/>
</View>
<Button 
raised title="Register" 
containerStyle={styles.button}
onPress={register}
/>
           
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        padding: 10,
    },
    button: {
        width:300,
        justifyContent: "center",
        marginTop:10,
    },
    inputContainer: {
        width: 320,
    },
})
