import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input,Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from '../firebase';


const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() =>{
navigation.setOptions({
    title: "Add a new Chat",
    headerTitleAlign: "center",
});
    },[navigation]);
    const createchat = async () =>{
        await db.collection('chats').add({
            chatName: input
        }).then(() =>{
            navigation.goBack()
        }).catch(error =>alert(error));
    };
    return (
        <View style={styles.container}>
          <Input 
          placeholder="Enter a chat name"
          onSubmitEditing={createchat}
          value={input} onChangeText={(text) => setInput(text)}
          leftIcon={
              <Icon name="wechat" typr="antdesign" size={24} color="black"/>
          }
          />
          <Button disabled={!input} onPress={createchat} title="Create new chat" />
        </View>
    );
};

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",

    },
})
