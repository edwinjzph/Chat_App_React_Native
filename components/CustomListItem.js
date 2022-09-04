import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem,Avatar } from 'react-native-elements';
import { db } from '../firebase';

 
const CustomListItem = ({id,chatName,enterChat}) => {
    const [chatMessages,setChatMessages]= useState([]);
    useEffect(() =>{
        const unsuscribe=db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data())) 
        );
        return unsuscribe;
    });
    return ( 
        <ListItem  key={id} onPress={() => enterChat(id, chatName)  } key={id} bottomDivider style={styles.container}>
            <Avatar
            style={{width: 30,height:30}} 
            rounded
             source={{
                uri: chatMessages?.[0]?.photoURL ||
                 "https://firebasestorage.googleapis.com/v0/b/signal-clone-fc7ca.appspot.com/o/user.png?alt=media&token=e595d551-84eb-48a9-8974-4add625cea55",
              }}/> 
              <ListItem.Content> 
                  <ListItem.Title style={{fontWeight: "800"}}>
                     {chatName}
                  </ListItem.Title>
                  <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                 {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
              </ListItem.Subtitle>  
              </ListItem.Content> 
        </ListItem>
    )
} 
 
export default CustomListItem

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",

    }
})
