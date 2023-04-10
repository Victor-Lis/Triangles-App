import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

import { useNavigation, StackActions } from '@react-navigation/native';

export default function Navbar({user}) {

    const navigation = useNavigation()

    const [userName, setUserName] = useState(null)

    useEffect(() => {

        firebase.database().ref(`cadastros/${user}`).once('value', (snapshot) => {

            setUserName(snapshot.val().nome)

        })

    },[])

 return (
   <View style={styles.navbar}>

    <TouchableOpacity onPress={() => navigation.dispatch(StackActions.push(`${userName}`))}>

        <Text style={styles.user}>{userName}</Text>

    </TouchableOpacity>

   </View>
  );
}


const styles = StyleSheet.create({
    navbar:{

      backgroundColor: "#fff",
      flexDirection: "row",
      marginBottom: "15%",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: "5%",
      paddingVertical: "1.05%",
      elevation: 5,

    },
    user:{

        fontSize: 20,
        marginVertical: "10.5%"

    },
});