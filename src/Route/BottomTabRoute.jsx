import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import CalculeTriangle from '../Components/CalculeTriangle';
import StackCalculate from './StackCalculate';

import Feather from 'react-native-vector-icons/Feather';
import ListaHistorico from '../Components/ListaHistorico';

export default function BottomTabRoute({userUid}) {
 return (
    <Tab.Navigator>
        <Tab.Screen
            name="Cadastro"
            component={StackCalculate}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="home" color={color} size={size} />
                },
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Histórico"
            component={ListaHistorico}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="home" color={color} size={size} />
                },
                headerBackgroundContainerStyle: {

                    backgroundColor: "#fff",
                    elevation: 5,

                }
            }}
        />
    </Tab.Navigator>
  );
}