import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/Components/Login';
import BottomTabRoute from './src/Route/BottomTabRoute';

export default function App() {
  
  const [user, setUser] = useState(null) 
  const [userName, setUserName] = useState(null)

  if(!user){

    return(

      <Login newUser={setUser} setUserName={setUserName}/>

    )

  }else{

    return (

      <NavigationContainer>
  
        <BottomTabRoute userUid={user}/>

      </NavigationContainer>

    );      
  }
}