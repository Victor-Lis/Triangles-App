import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default function Resultados() {
  const [resultados, setResultados] = useState([]);
  const [showMensage, setShowMessage] = useState(true)

  useEffect(() => {
    const user = firebase.auth().currentUser.uid;
    const resultadosRef = firebase.database().ref(`cadastros/${user}/resultados`);

    resultadosRef.on('value', (snapshot) => {

        if(!snapshot.exists()){

            setShowMessage(true)

        }else{

            setShowMessage(false)

        }

      const resultadosArray = [];
      snapshot.forEach((childSnapshot) => {
        const resultado = childSnapshot.val();
        resultadosArray.push({
          id: childSnapshot.key,
          data: resultado.data,
          horario: resultado.horario,
          ponto1: resultado.ponto1,
          ponto2: resultado.ponto2,
          ponto3: resultado.ponto3,
          resultado: resultado.resultado,
        });
      });
      setResultados(resultadosArray);
    });

    // Remover listener quando o componente é desmontado
    return () => {
      resultadosRef.off('value');
    };
  }, []);

  const renderResultado = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.data}</Text>
          <Text style={styles.time}>{item.horario}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Ponto 1:</Text>
          <Text style={styles.infoValue}>{item.ponto1}</Text>
          <Text style={styles.infoTitle}>Ponto 2:</Text>
          <Text style={styles.infoValue}>{item.ponto2}</Text>
          <Text style={styles.infoTitle}>Ponto 3:</Text>
          <Text style={styles.infoValue}>{item.ponto3}</Text>
          <Text style={styles.infoTitle}>Resultado:</Text>
          <Text style={styles.infoValue}>{item.resultado}</Text>
        </View>
      </View>
    );
  };

  if(showMensage){

    return (

        <Text style={styles.title}> Você ainda não fez nenhum cálculo! </Text>

   )

  }else{

    return (

       <FlatList
        data={resultados}
        renderItem={renderResultado}
        keyExtractor={(item) => item.id}
      />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#000',
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 8,
  },
  infoTitle: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoValue: {
    color: '#000',
    fontSize: 14,
    marginTop: 4,
  },
  title: {
    fontSize: 17,
    color: "rgba(787,0,0,0.8)",
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
    marginTop: "5%"
  },
});