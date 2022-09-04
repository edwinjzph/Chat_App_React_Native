import { StyleSheet,ScrollView,Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-elements';
import { auth,db } from '../firebase';
import { AntDesign,SimpleLineIcons} from "@expo/vector-icons";


 
const HomeScreen = ({navigation}) => {
    const [chats,setChats] = useState([]);
    const signoutuser = () =>{
        auth.signOut().then(() =>{
            navigation.replace("Login");
        });
    };
    useEffect(() => {
        const unsuscribe=db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({  
                id: doc.id,
                data: doc.data(),
            })))
        });
        return unsuscribe;
    },[])
    useLayoutEffect(() => {
    navigation.setOptions({
        title:"Signal",
        headerStyle: {backgroundcolor: '#fff',},
        headerTitleStyle: {color: "black"},
        headerTitleAlign: "Center",
        headerTintColor: {color: "black"},
        headerLeft: () =>(<View style={{marginLeft:20}}>
            <TouchableOpacity  onPress={signoutuser} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
            </TouchableOpacity>
        </View>),
        headerRight: () => (
            <View style={{
                flexDirection: "row",
               justifyContent: "space-between",
                width: 80,
                marginRight: 20,
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name='camerao' size={24} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => navigation.navigate("Addchat")}
                activeOpacity={0.5}>
                    <SimpleLineIcons name='pencil' size={24} color='black'/>
                </TouchableOpacity>
            </View>
        ),
    });
    }, [ navigation]);


    const enterChat =(id,chatName) => {
        navigation.navigate("edwin" ,{
            id,
            chatName, 
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style="dark"/>
           <ScrollView style={styles.container}>
            {chats.map(({id,data: {chatName}}) => (
   <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}  />
            ))}
           </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height: "100%",
    },
});  
