import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image } from 'react-native';
import Navbar from './Navbar';
import firebase from 'firebase';

export default function CalculeTriangle({route}) {
      
  const [user, setUser] = useState(route.params?.userUid)
  const [point1, setPoint1] = useState('');
  const [point2, setPoint2] = useState('');
  const [point3, setPoint3] = useState('');
  const [result, setResult] = useState('');

  const dataAtual = new Date();

   const verifyTriangle = async () => {

    // convert points to numbers

    if(point1 == "" || point2 == "" || point3 == ""){

      alert("Preencha os campos!")
      return

    }

    const p1 = await parseInt(point1);
    const p2 = await parseInt(point2);
    const p3 = await parseInt(point3);

    // check if values create a valid triangle
    if (p1 + p2 > p3 && p2 + p3 > p1 && p1 + p3 > p2) {
      // determine type of triangle
      if (p1 === p2 && p2 === p3) {
        setResult('Equilátero');
      } else if (p1 === p2 || p2 === p3 || p1 === p3) {
        setResult('Isósceles');
      } else {
        setResult('Escaleno');
      }
    } else {
      setResult('Não forma um triângulo');
    }

  }

  useEffect(() => {

    if(result != ""){

      let resultados = firebase.database().ref(`cadastros/${user}/resultados`)
      let chave = resultados.push().key
      console.log(`${parseInt(dataAtual.getHours()) < 10? +dataAtual.getHours(): dataAtual.getHours()}`)
  
      console.log(result)
  
      resultados.child(chave).set({
  
          data: dataAtual.toLocaleDateString(),
          horario: (parseInt(dataAtual.getHours()) < 10? "0"+dataAtual.getHours(): dataAtual.getHours())+":"+(parseInt(dataAtual.getMinutes()) < 10? "0"+dataAtual.getMinutes(): dataAtual.getMinutes()),
          ponto1: point1,
          ponto2: point2,
          ponto3: point3,
          resultado: result,
  
      })
  
      setPoint1("")
      setPoint2("")
      setPoint3("")

    }

  }, [result])

  return (
      <View style={styles.container}>
        <Navbar user={user}/> 
        <Text style={styles.title}> Preencha os campos </Text>
        <TextInput
          style={styles.input}
          placeholder="Ponto 1"
          onChangeText={setPoint1}
          value={point1}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Ponto 2"
          onChangeText={setPoint2}
          value={point2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Ponto 3"
          onChangeText={setPoint3}
          value={point3}
          keyboardType="numeric"
        />
        <Button
          title="Definir Triângulo"
          onPress={verifyTriangle}
        />
          {result && result !== 'Não forma um triângulo' && (
            <Text style={styles.result}> Triângulo: <Text style={{textDecorationLine: 'underline', color: "rgba(0,150,300,0.99)"}}>{result}</Text></Text>
          )}
          {result && result == 'Equilátero'  && (

            <Image style={styles.image} source={require("../Images/Equilatero.png")}/>

          )}
          {result && result == 'Escaleno'  && (

            <Image style={styles.image} source={require("../Images/Escaleno.png")}/>

          )}
          {result && result == 'Isósceles'  && (

            <Image style={styles.image} source={require("../Images/Isosceles.png")}/>

          )}
          {result && result === 'Não forma um triângulo' && (
            <Text style={[styles.result, {color: "red"}]}> {result} </Text>
          )}
        </View>
    );      

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: "5%",
        textAlign: "left",
        width: "90%",
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
      width: '90%',
    },
    result: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
    },
    image: {
      width: "25%",
      height: "15%",
    },
});