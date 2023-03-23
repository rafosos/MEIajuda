import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import styles from "./styles";

const Login = () => {
  const [nome, setNome] = useState('');
  const userContext = useUser();
  const storageService = AsyncStorageService();

  const salvarNome = () => {
    storageService.salvarNomeFantasia(nome).then(() => {
      userContext.setNome(nome);
    }).catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTudo}>
        <View style={styles.containerImagem}>
          <Image source={require('../../assets/logomeiajuda.png')} style={styles.imgLogo} />
        </View>
        <TextInput
          placeholder="Insira seu nome aqui"
          placeholderTextColor="#666"
          style={styles.txtInput} 
          onChangeText={setNome}
          value={nome}
        />
        <Button title="Próximo" onPress={() => salvarNome()} style={styles.botao} />
      </View>
    </View>
  );
};

export default Login;