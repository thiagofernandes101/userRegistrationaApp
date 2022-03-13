import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Text, TextInput, View, ScrollView, Keyboard, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles/style';
import { UserModel } from './models/UsuarioModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import emailIcon from './images/email.png';
import { Ionicons, AntDesign} from '@expo/vector-icons';

export default function App() {
  const storageKey = "@user";

  const [id, setId] = useState();
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [users, setUsers] = useState([]);
  const [reloadScreen, setReloadScreen] = useState(true);

  async function saveUser() {
    let newRegister = false;
    let identifier = id;

    if (identifier == undefined) {
      identifier = uuid.v4();
      newRegister = true;
    }

    let user = new UserModel(identifier, code, name, email, password);

    try {
      if (user.isValid() && user.password == confirmedPassword) {
        let userArray = {
          id: identifier,
          code: code,
          name: name,
          email: email,
        };

        if (newRegister) {
          users.push(userArray);
        }
        else {
          for (i = 0; i < users.length; i++) {
            if (users[i].id == identifier) {
              users[i] = userArray;
              break;
            }
          }
        }

        const usersAsJson = JSON.stringify(userArray);
        await AsyncStorage.setItem(storageKey, usersAsJson);
        clearFields();
        setReloadScreen(true);
      }
      else {
        Alert.alert("Não foi possível cadastrar o usuário. Verique se as informações inseridas.");
      }
    }
    catch (error) {
      Alert.alert("Erro: " + error.toString())
    }
  }

  function clearFields() {
    setCode("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
    Keyboard.dismiss();
  }

  useEffect(() => {
    loadUsers();
    console.log("useEffect method");
  }, [reloadScreen]);

  async function loadUsers() {
    try {
      // setUsers([]);
      const userAsJson = await AsyncStorage.getItem(storageKey);

      if (userAsJson != null) {
        const userAsJsonParse = JSON.parse(userAsJson);
        let user = [{
          code: userAsJsonParse.code,
          email: userAsJsonParse.email,
          id: userAsJsonParse.id,
          name: userAsJsonParse.name
        }]
        setUsers(user);
      }
      else {
        setUsers([]);
        console.log("users");
        console.log(users)
      }

      setReloadScreen(false);
    }
    catch (erro) {
      Alert.alert(erro.toString());
    }
  }

  function editUser(identifier) {
    const user = users.find(user => user.id == identifier);

    if (user != undefined) {
      setId(user.id);
      setCode(user.code);
      setName(user.name);
      setEmail(user.email);
    }
  }

  async function deleteUsers() {
    try {
      await AsyncStorage.removeItem(storageKey);
      setReloadScreen(true);
    }
    catch (error) {
      Alert.alert(error);
    }
  }

  function deleteAll() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os usuários?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            deleteUsers();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }

  function removeElement(identifier) {
    Alert.alert('Atenção', 'Confirma a remoção do usuário?',
      [
        {
          text: 'Sim',
          onPress: () => removeUser(identifier),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function removeUser(identifier) {
    try {
      const user = users.filter(user => user.id != identifier);
      const userAsJson = JSON.stringify(user);
      await AsyncStorage.setItem(storageKey, userAsJson);
      
      Keyboard.dismiss();
      Alert.alert('Usuário apagado com sucesso!!!');
      
      clearFields();
      reloadScreen(true);
    } 
    catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <Text style={[styles.heading, styles.title]}>Cadastro de usuários</Text>

        <View>
          <View style={[styles.inputGroup]}>
            <Text style={[styles.text]}>Código</Text>
            <TextInput style={[styles.inputBox]}
              placeholder='Digite seu código'
              keyboardType='numeric'
              onChangeText={(code) => setCode(parseInt(code))}
              value={code?.toString()}
            >
            </TextInput>
          </View>

          <View style={[styles.inputGroup]}>
            <Text style={[styles.text]}>Nome</Text>
            <TextInput style={[styles.inputBox]}
              placeholder='Digite seu nome'
              keyboardType='default'
              onChangeText={(name) => setName(name)}
              value={name}
            >
            </TextInput>
          </View>

          <View style={[styles.inputGroup]}>
            <Text style={[styles.text]}>E-mail</Text>
            <TextInput style={[styles.inputBox]}
              placeholder='Informe seu e-mail'
              keyboardType='default'
              onChangeText={(email) => setEmail(email)}
              value={email}
            >
            </TextInput>
          </View>

          <View style={[styles.inputInlineGrouping]}>
            <View style={[styles.inputGroup]}>
              <Text style={[styles.text]}>Senha</Text>
              <TextInput style={[styles.inputBox]}
                placeholder='Digite uma senha'
                keyboardType='default'
                secureTextEntry={true}
                maxLength={15}
                onChangeText={(password) => setPassword(password)}
                value={password}
              >
              </TextInput>
            </View>
            <View style={[styles.inputGroup]}>
              <Text style={[styles.text]}>Confirmar senha</Text>
              <TextInput style={[styles.inputBox]}
                placeholder='Confirme sua senha'
                keyboardType='default'
                secureTextEntry={true}
                maxLength={15}
                onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                value={confirmedPassword}
              >
              </TextInput>
            </View>
          </View>

          <View style={[styles.inLineGrouping]}>
            <Button title='Salvar' color={"#0BDA51"} onPress={() => saveUser()}></Button>
            <Button title='Remover' onPress={() => removeElement()}></Button>
            <Button title='Excluir tudo' color={"#DC143C"} onPress={() => deleteAll()}></Button>
          </View>
        </View>

        <View style={styles.userList}>
        {
          users.map((user, index) => (
            <View style={styles.user} key={index.toString()}>

              <Text style={styles.nameList}> {user.name}</Text>
              <View style={styles.emailDataList}>
                <Image source={emailIcon} style={styles.emailIcon} />
                <Text style={styles.emailList} >{user.email} </Text>
              </View>

              <View style={styles.actionButtonData}>
                <TouchableOpacity onPress={() => removeElement(user.id)}>
                  <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editUser(user.id)}>
                  <AntDesign name="edit" size={32} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }
      </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}