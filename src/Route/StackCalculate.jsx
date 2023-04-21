import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import CalculeTriangle from '../Components/CalculeTriangle';
import User from '../Components/User';

export default function StackCalculate({route}) {

  const [user, setUser] = useState(route.params?.userUid)

  const [userName, setUserName] = useState(null)

  useEffect(() => {

    firebase.database().ref(`cadastros/${user}`).once('value', (snapshot) => {

        setUserName(snapshot.val().nome)

    })

  },[])

  return (
    <Stack.Navigator>
        <Stack.Screen
        
            component={CalculeTriangle}
            initialParams={{userUid: user}}
            name="Calcular"
            options={{
                headerShown: false,
            }}

        />
        <Stack.Screen
        
            component={User}
            initialParams={{userUid: user}}
            name={`${userName}`}
            options={{
                headerShown: true,
            }}

        />
    </Stack.Navigator>
  );
}