import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Feather from 'react-native-vector-icons/Feather';

export default function User({ route }) {

  const [user, setUser] = useState(route.params?.userUid);

  const [userName, setUserName] = useState(null);
  const [initialName, setInitialName] = useState(null)
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [initialPassword, setInitialPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [initialEmail, setInitialEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref(`cadastros/${user}`)
      .on('value', (snapshot) => {
        setUserName(snapshot.val().nome);
        setUserEmail(snapshot.val().email);
        setUserPassword(snapshot.val().senha);
        setInitialName(snapshot.val().nome)
        setInitialEmail(snapshot.val().email)
        setInitialPassword(snapshot.val().senha);
      });
  }, []);

  const handleUpdateUser = () => {

      if(userName != initialName){

        firebase.database().ref(`cadastros/${user}`)
        .update({
          nome: userName,
        }).then(() => {

          alert("Nome alterado com sucesso!")
          setInitialName(userName)

        }).catch((error) => {
          alert(error)
          console.error(error);
          return
        });

      }

      if(userEmail !== firebase.auth().currentUser.email) {
        firebase.auth().currentUser.updateEmail(userEmail)
        .then(() => {
          alert('Email do usuário atualizado com sucesso!');
          firebase.database().ref(`cadastros/${user}`)
          .update({
            email: userEmail,
          }).then(() => {

              setInitialEmail(userEmail)

            }
          )
        }).catch((error) => {
          alert(error)
          console.error(error);
          return
        });
        
      }
    
      if(userPassword !== initialPassword) {
        firebase.auth().currentUser.updatePassword(userPassword)
        .then(() => {
          alert('Senha do usuário atualizada com sucesso!');
          firebase.database().ref(`cadastros/${user}`)
          .update({
            senha: userPassword,
          }).then(() => setInitialPassword(userPassword))
        }).catch((error) => {
          alert(error)
          console.error(error);
          return
        });
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Dados</Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{initialName}</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{initialEmail}</Text>
      </View>

        <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Senha:</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.info, styles.passwordInput]}
                    value={initialPassword}
                    secureTextEntry={!showPassword}
                    editable={false}
                />
                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Feather name='eye' size={20} color={"rgba(0,100,250, 1)"}/> : <Feather name='eye-off' size={20} color={"rgba(50,50,50, 0.6)"}/> }
                </TouchableOpacity>
            </View>
        </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Editar Dados</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Dados</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Nome"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />

          <TextInput
            style={styles.modalInput}
            placeholder="E-mail"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />

                <TextInput
                    style={[styles.modalInput]}
                    value={userPassword}
                    onChangeText={setUserPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={[styles.passwordButton]}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <Feather name='eye' size={20} color={"rgba(0,100,250, 1)"}/> : <Feather name='eye-off' size={20} color={"rgba(50,50,50, 0.6)"}/> }
                </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={handleUpdateUser}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
      flex: 1,
    },
    info: {
      flex: 2,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 2,
    },
    passwordInput: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
    },
    passwordButton: {
      backgroundColor: '#ccc',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 0,
    },
    passwordButtonText: {
      color: '#fff',
    },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingHorizontal: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
    },
    modalButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });