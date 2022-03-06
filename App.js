import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Text, TextInput, View, ScrollView } from 'react-native';
import { useState } from 'react';
import styles from './styles/style';
import { UserModel } from './models/UsuarioModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();

  const storageKey = "@contato"

  async function saveUser() {
    let user = new UserModel(code, name, email, password);

    try {
      if (user.isValid() && user.password == confirmedPassword) {
        const userAsJson = JSON.stringify(user);
        await AsyncStorage.setItem(storageKey, userAsJson);
  
        Alert.alert("Salvo com sucesso!");
      }
      else {
        Alert.alert("Não foi possível cadastrar o usuário. Por favor verique se as informações inseridas estão corretas");
      }
    }
    catch (error) {
      Alert.alert("Erro: " + error.toString())
    }
  }

  async function loadUser() {
    try {
      const userAsJson = await AsyncStorage.getItem(storageKey);
      if (userAsJson != null) {
        const user = JSON.parse(userAsJson);
        
        setCode(user.code);
        setName(user.name);
        setEmail(user.email);
      }
      else {
        limpaCampos();
        Alert.alert("Não há cadastro!");
      }
    }
    catch (erro) {
      Alert.alert(erro.toString());
    }
  }

  function clearFields() {
    setCode("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
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
            <Button title='Carregar' onPress={() => loadUser()}></Button>
            <Button title='Limpar' color={"#DC143C"} onPress={() => clearFields()}></Button>
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}