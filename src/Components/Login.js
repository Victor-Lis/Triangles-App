import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../Connections/firebaseConnection'

import Feather from 'react-native-vector-icons/Feather'

export default function Login({newUser}) {

    const [type, setType] = useState("login")
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    // const [celular, setCelular] = useState("");
    // const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    async function handleLogin(){
    
        let newEmail = '';

        if(email[email.length - 1] === " "){

            newEmail = email.slice(0, -1)

        }

        if(type === "login"){

            firebase.auth().signInWithEmailAndPassword((newEmail == ''? email : newEmail), password)
            .then(user => {

                newUser(user.user.uid)
                console.log("Login bem sucedido")

            })
            .catch(err => {

                alert(err.message)
                console.log("Algo deu errado!")

            })

        }else{

            if(password != secondPassword){

                alert("As senhas estão diferentes!")
                return

            }
            
            await firebase.auth().createUserWithEmailAndPassword((newEmail == ''? email.toLowerCase() : newEmail.toLowerCase()), password)
            .then(user => {

                newUser(user.user.uid)
                const newRef = firebase.database().ref(`cadastros/${user.user.uid}`);
                newRef.set({

                    email: (newEmail == ''? email.toLowerCase() : newEmail.toLowerCase()),
                    // celular: celular,
                    // CPF: cpf,
                    senha: password,
                    nome: nome,
                    resultados: "",
                    
                })
                console.log("Cadastro bem sucedido")
            
            })
            .catch(err => {

                alert(err.message)
                console.log("Algo deu errado!")

            })

        }

    }

 return (
   <SafeAreaView style={styles.container}>
        <StatusBar style="auto" hidden={true}/>
        {type != 'login' && 
            <TextInput
                placeholder='Nome'
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            /> 
        }
            <TextInput
                placeholder='Seu email'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
        {/* {type != 'login' && 
            <TextInput
                placeholder='Celular'
                style={styles.input}
                value={celular}
                onChangeText={setCelular}
            /> 
        } */}
        {/* {type != 'login' && 
            <TextInput
                placeholder='CPF'
                style={styles.input}
                value={cpf}
                onChangeText={setCPF}
            /> 
        } */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, {flex: 10}]}
                    value={password}
                    secureTextEntry={!showPassword}
                    placeholder={showPassword? "12345": "*****"}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <Feather name='eye' size={25} color={"rgba(0,100,250, 1)"}/> : <Feather name='eye-off' size={25} color={"rgba(50,50,50, 0.6)"}/> }
                </TouchableOpacity>
            </View>

        {type != 'login' && 
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, {flex: 10}]}
                    value={secondPassword}
                    secureTextEntry={!showPassword2}
                    placeholder={showPassword2? "12345": "*****"}
                    onChangeText={setSecondPassword}
                />
                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={() => setShowPassword2(!showPassword2)}
                >
                    {showPassword2 ? <Feather name='eye' size={25} color={"rgba(0,100,250, 1)"}/> : <Feather name='eye-off' size={25} color={"rgba(50,50,50, 0.6)"}/> }
                </TouchableOpacity>
            </View> 
        }

        <TouchableOpacity
            style={[styles.handleLogin, {backgroundColor: type == "login"? "#3ea6f2": "#141414"}]}
            onPress={() => handleLogin()}
        >

            <Text style={styles.loginText}> {type == "login"? "Acessar": "Cadastrar"} </Text> 

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setType(type => type === 'login' ? "cadastrar" : "login")}>

            <Text style={{textAlign: "center"}}> {type == "login"? "Criar uma conta": "Já possuo uma conta"} </Text>

        </TouchableOpacity>

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: 20,
        backgroundColor: "#f2f6fc",
        paddingHorizontal: 10,

    },
    input: {

        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 45,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#141414",

    },
    passwordContainer:{

        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        width: "100%",

    },
    passwordButton: {
    
        marginLeft: "1%",
        flex: 0.8,
        marginBottom: 10,
        backgroundColor: "rgba(235,235,235,0.5)",
        borderRadius: 5,
        height: 45,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#141414",
        textAlign: "center",
        paddingHorizontal: 10,

    },
    passwordButtonText:{

        color: "rgba(0,0,255,0.9)",
        textAlign: "center"

    },
    handleLogin: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        height: 45,
        marginBottom: 10,

    },
    loginText: {

        color: "#fff",
        fontSize: 17,

    }

})